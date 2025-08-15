---
title: "Connecting to a Server with SSH (Key-Based Authentication)"
date: "2025-08-14"
description: "A simple guide to connect to a server using SSH key-based authentication with a custom .ssh/config file."
---

## Prerequisites

You should have:

- A server with SSH enabled (e.g., cloud instance, VPS, dedicated server).
- Access to an account on the server (e.g., `admin`, or `user`).
- A local machine with **OpenSSH** installed (Linux, macOS, or Windows with WSL/PowerShell).
- Permission to add your SSH public key to the server.

## 1. SSH Authentication Types

SSH supports multiple authentication methods:

- **Password-based**  
  Enter a username and password when connecting. Simple, but less secure.

- **Key-based** (recommended)  
  Use a cryptographic key pair for authentication. No password sent over the network.

- **Other methods**  
  Includes GSSAPI/Kerberos, certificate-based, and hardware tokens.

This guide focuses on **key-based authentication**.

## 2. Generate an SSH Key Pair

Run this command on your local machine:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

- `-t ed25519` — modern, secure key type.
- `-C` — optional comment (usually your email).
- Press **Enter** to accept default location (`~/.ssh/id_ed25519`).
- You can set a passphrase for extra protection (optional).

If you prefer RSA (for compatibility with older systems):

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

## 3. Add Your Public Key to the Server

### Option A — You have server access and can edit `authorized_keys` directly:

1. Copy your public key to the server:
   ```bash
   ssh-copy-id user@example.com
   ```
   *(Replace `user@example.com` with your server username and address.)*

2. Or manually append your public key to:
   ```
   ~/.ssh/authorized_keys
   ```

### Option B — You send your public key to the server administrator:

- Provide the contents of your public key file (e.g., `~/.ssh/id_ed25519.pub`).
- The admin will add it to `~/.ssh/authorized_keys` for your account.

## 4. Configure `.ssh/config` for Easier Connections

Instead of typing a long SSH command with username, hostname, and key path each time, create a shortcut.

Edit (or create) your SSH config file:

```bash
nano ~/.ssh/config
```

or for vim users:
```bash
vi ~/.ssh/config
```

Example:

```
Host myserver
  HostName server.example.com
  User myuser
  IdentityFile ~/.ssh/myserver-key.pem
```

- `Host` — nickname for the connection.
- `HostName` — server’s public IP or domain.
- `User` — username on the server.
- `IdentityFile` — path to your private key.

Save the file, then:

```bash
chmod 600 ~/.ssh/config
```

## 5. Connect to the Server

Now you can connect with just:

```bash
ssh myserver
```

Instead of:

```bash
ssh -i ~/.ssh/myserver-key.pem myuser@server.example.com
```

## 6. Troubleshooting

- **Permission denied (publickey)**  
  - Check that the public key is in the correct `~/.ssh/authorized_keys` file.
  - Ensure `~/.ssh` (700) and `authorized_keys` (600) permissions are correct.

- **.ssh/config not applied**  
  - Ensure file permissions are `chmod 600`.
  - Confirm that `Host` name matches the shortcut you’re using.


## Best Practices

- Use **ed25519** keys for stronger security and faster authentication.
- Never share your private key.
- Keep a backup of your private key in a safe location.
- Disable password authentication on the server for better security (optional).