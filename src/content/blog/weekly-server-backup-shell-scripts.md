---
title: "A Weekly Server Backup Pipeline in Three Shell Scripts"
date: "2026-07-29"
description: "Dump a MySQL database, archive the app directory, and pull both down to your machine with rsync — plus the silent failure modes that make backups useless."
image: "/images/blog/weekly-server-backup-shell-scripts.jpg"
---

I run a small site on a single server. Nothing about it justifies a backup service, but losing the database would still ruin a weekend. What it needed was the boring version: cron dumps the database and tars the app directory, then my laptop pulls both down.

Three scripts, about 120 lines total. The interesting part isn't the scripts — it's the failure modes, because a backup that fails quietly is worse than no backup at all. You *think* you're covered right up until you need to restore.

## The Shape

```
On the server (weekly cron):
  mysql-db-backup.sh      → /migoy_backups/db_backup/2026-07-29-030000.tgz
  app-directory-backup.sh → /migoy_backups/app_backup/app_backup-2026-07-29-030500.tgz

On my machine (weekly cron):
  rsync-server-backup-to-local.sh → pulls both directories down
```

Backups live on the server *and* on a machine in my house. A backup that only exists on the box you're backing up is not a backup.

## 1. Dumping the Database

```bash
#!/bin/bash
#
# Dumps a MySQL database, compresses it, and prunes old archives.

set -euo pipefail

DB_HOST=""
DB_USER=""
DB_PASS=""
DB_NAME=""

BACKUP_DIR="/migoy_backups/db_backup"
RETENTION_DAYS=30

for var in DB_HOST DB_USER DB_PASS DB_NAME; do
  if [ -z "${!var}" ]; then
    echo "Error: $var is not set." >&2
    exit 1
  fi
done

mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date +%Y-%m-%d-%H%M%S)
DUMP_NAME="$TIMESTAMP.sql"
DUMP_PATH="$BACKUP_DIR/$DUMP_NAME"
ARCHIVE_PATH="$BACKUP_DIR/$TIMESTAMP.tgz"

# Credentials go through a 0600 file rather than the command line.
CNF_FILE=$(mktemp)
chmod 600 "$CNF_FILE"
trap 'rm -f "$CNF_FILE"' EXIT

cat >"$CNF_FILE" <<EOF
[client]
host=$DB_HOST
user=$DB_USER
password=$DB_PASS
EOF

if ! mysqldump --defaults-extra-file="$CNF_FILE" \
  --no-tablespaces --single-transaction --quick \
  "$DB_NAME" >"$DUMP_PATH"; then
  echo "Error: mysqldump failed." >&2
  rm -f "$DUMP_PATH"
  exit 1
fi

if [ ! -s "$DUMP_PATH" ]; then
  echo "Error: dump is empty." >&2
  rm -f "$DUMP_PATH"
  exit 1
fi

if ! tar -czf "$ARCHIVE_PATH" -C "$BACKUP_DIR" "$DUMP_NAME"; then
  echo "Error: could not compress $DUMP_NAME." >&2
  rm -f "$ARCHIVE_PATH"
  exit 1
fi

rm -f "$DUMP_PATH"

if [ "$RETENTION_DAYS" -gt 0 ]; then
  find "$BACKUP_DIR" -maxdepth 1 -name '*.tgz' -mtime "+$RETENTION_DAYS" -delete
fi

echo "MySQL backup completed: $ARCHIVE_PATH"
```

Four things in there are worth more than the rest of the script.

### Never put the password on the command line

The obvious version is `mysqldump -u"$DB_USER" -p"$DB_PASS"`. It works, and it leaks:

```bash
$ ps aux | grep mysqldump
www-data  4821  mysqldump --no-tablespaces -hlocalhost -uroot -phunter2 mydb
```

`ps` is world-readable. Every user on that box can see your database password for as long as the dump runs — which, on a database worth backing up, is a while. Some `mysqldump` builds scrub the argument, most don't, and you shouldn't be relying on which.

A `--defaults-extra-file` avoids the problem entirely. The `mktemp` + `chmod 600` + `trap` combination means the file is only readable by you and gets deleted even if the script dies partway.

### Check the dump, not just the tar

This was the actual bug in my original version:

```bash
mysqldump ... > "$BACKUP_FILENAME"
tar -czvf "$ARCHIVE" "$BACKUP_FILENAME"
if [ $? -eq 0 ]; then
  echo "Backup completed successfully."
fi
```

`$?` holds the exit status of `tar`, not `mysqldump`. So if the dump failed — wrong password, disk full, MySQL down — the redirect still created a file, `tar` happily compressed those zero bytes, and the script printed **"Backup completed successfully."**

Cron mails you nothing, because as far as the shell is concerned nothing went wrong. You accumulate a tidy directory of timestamped empty archives and find out months later.

The fix is two checks: test `mysqldump`'s own status with `if ! mysqldump ...`, then test the file with `[ ! -s "$DUMP_PATH" ]`. The second matters because a dump can exit `0` and still write nothing useful.

### `set -euo pipefail`

- `-e` exits on any unchecked command failure
- `-u` turns a typo'd variable into an error instead of an empty string, which is what stops `rm -rf "$BACKUP_DIR/$TYPO"` from becoming `rm -rf "/"`-adjacent
- `-o pipefail` makes a pipeline fail if *any* stage fails, not just the last one

### `tar -C`, not absolute paths

```bash
tar -czf archive.tgz /migoy_backups/db_backup/2026-07-29.sql
# tar: Removing leading `/' from member names
```

tar strips the leading slash with a warning, and the archive ends up with `migoy_backups/db_backup/2026-07-29.sql` baked in. Extract it somewhere else and you get that whole tree back. `-C "$BACKUP_DIR" "$DUMP_NAME"` changes directory first, so the archive holds just the filename.

## 2. Archiving the App Directory

```bash
#!/bin/bash
set -euo pipefail

APP_DIR="/mtrinidad.ronins.site"
BACKUP_DIR="/migoy_backups/app_backup"
RETENTION_DAYS=30

if [ ! -d "$APP_DIR" ]; then
  echo "Error: $APP_DIR does not exist." >&2
  exit 1
fi

mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date +%Y-%m-%d-%H%M%S)
ARCHIVE_PATH="$BACKUP_DIR/app_backup-$TIMESTAMP.tgz"

if ! tar -czf "$ARCHIVE_PATH" \
  -C "$(dirname "$APP_DIR")" "$(basename "$APP_DIR")"; then
  echo "Error: app directory backup failed." >&2
  rm -f "$ARCHIVE_PATH"
  exit 1
fi

if [ "$RETENTION_DAYS" -gt 0 ]; then
  find "$BACKUP_DIR" -maxdepth 1 -name '*.tgz' -mtime "+$RETENTION_DAYS" -delete
fi

echo "App directory backup completed: $ARCHIVE_PATH"
```

The `dirname`/`basename` pair is what keeps the archive relative — `cd` to the parent, then add the directory by name. Both need quoting: `$(dirname $APP_DIR)` unquoted splits on the first space in your path.

The `[ ! -d "$APP_DIR" ]` check exists because a typo'd path is otherwise indistinguishable from success. tar would error, sure, but if you'd also swallowed the status you'd be generating empty archives again.

## 3. Pulling Both Down

```bash
#!/bin/bash
set -euo pipefail

USER=""
DOMAIN=""
SSH_KEY_PATH=""

# Trailing slash on the source copies the directory *contents*.
SOURCE_DIR_DB="/migoy_backups/db_backup/"
DEST_DIR_DB="/migoy_backups/db_backup"

SOURCE_DIR_APP="/migoy_backups/app_backup/"
DEST_DIR_APP="/migoy_backups/app_backup"

for var in USER DOMAIN SSH_KEY_PATH; do
  if [ -z "${!var}" ]; then
    echo "Error: $var is not set." >&2
    exit 1
  fi
done

if [ ! -f "$SSH_KEY_PATH" ]; then
  echo "Error: no SSH key at $SSH_KEY_PATH" >&2
  exit 1
fi

pull() {
  local label="$1" source="$2" dest="$3"

  mkdir -p "$dest"

  if rsync -aziO --partial -e "ssh -i '$SSH_KEY_PATH'" \
    "$USER@$DOMAIN:$source" "$dest"; then
    echo "$label rsync completed successfully."
  else
    echo "Error: $label rsync failed." >&2
    return 1
  fi
}

pull "Database backup" "$SOURCE_DIR_DB" "$DEST_DIR_DB"
pull "Application backup" "$SOURCE_DIR_APP" "$DEST_DIR_APP"
```

### The trailing slash is not cosmetic

This is rsync's most famous foot-gun:

```bash
rsync -a /src/dir/ /dest/dir   # contents of dir → /dest/dir/
rsync -a /src/dir  /dest/dir   # the dir itself  → /dest/dir/dir/
```

Get it backwards and your backups nest one level deeper every run.

### The flags

| Flag | Why |
|------|-----|
| `-a` | Archive mode — recursive, preserves permissions, times, symlinks |
| `-z` | Compress in transit |
| `-i` | Itemize changes, so the log says what actually moved |
| `-O` | Skip directory timestamps, which otherwise churn on every run |
| `--partial` | Keep partial transfers so an interrupted run resumes |

`--partial` earns its place the first time a multi-gigabyte archive dies at 90% on a home connection.

I dropped `-v` from the original. Combined with `-i` it's redundant, and under cron it turns every run into a wall of output — which trains you to ignore the mail, which defeats the point of having it.

## Wiring Up Cron

On the server:

```cron
0 3 * * 0 /root/scripts/mysql-db-backup.sh
5 3 * * 0 /root/scripts/app-directory-backup.sh
```

On my machine:

```cron
0 4 * * 0 /home/miguel/scripts/rsync-server-backup-to-local.sh
```

An hour of slack between the dumps and the pull, so a slow dump doesn't get copied mid-write.

One crontab gotcha: `%` is special in crontab entries and must be escaped as `\%`. That's why you sometimes see this in scripts:

```bash
DATE_FORMAT=$(date +\%Y-\%m-\%d)
```

Those backslashes belong in a *crontab line*, not in a script file. Inside a script `\%` is just `%`, so it works by accident — a tell that the command was pasted out of a crontab. If you call `date` directly from crontab, escape it. In a script, don't.

## Actually Test the Restore

The scripts above make backups. They don't prove those backups are any good, and an untested backup is a guess.

```bash
# Does the archive open, and is there SQL in it?
tar -tzf 2026-07-29-030000.tgz
tar -xzOf 2026-07-29-030000.tgz | head -20

# Restore into a scratch database and count something
mysql -e "CREATE DATABASE restore_test"
tar -xzOf 2026-07-29-030000.tgz | mysql restore_test
mysql restore_test -e "SHOW TABLES"
```

If `SHOW TABLES` comes back empty, you just learned something important at a time of your choosing rather than during an outage.

## What I'd Add Next

- **A dead-man's switch.** These scripts shout when they fail, but say nothing when they never run at all — a wedged cron, a full disk, a server that rebooted. A ping to a healthcheck service on success, alerting on *absence*, covers that.
- **Off-site copies.** Server plus my house is two locations, but both are one accident from a bad week. Pushing archives to object storage is a few more lines.
- **Encryption at rest.** These tarballs contain a full database. If they're leaving the server, `gpg --symmetric` before they travel is cheap.

Nothing here is clever. It's just a database dump, a tarball, and rsync — with the exit statuses actually checked, which is the only part that separates a backup from a folder of empty files.
