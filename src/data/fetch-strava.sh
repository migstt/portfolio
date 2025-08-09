#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# ======================
# Config
# ======================
CLIENT_ID="171921"
CLIENT_SECRET="c1d77e11285b5a3b59648601a932b2fc3ed92743"

DATA_DIR="/home/migoy99/projects/portfolio/src/data"
CURRENT_FILE="$DATA_DIR/strava.json"
NEW_FILE="$DATA_DIR/strava.new.json"
LOG_FILE="$DATA_DIR/strava.log"
REFRESH_TOKEN_FILE="$DATA_DIR/strava.refresh_token"

# ======================
# Helpers
# ======================
log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') $1" >> "$LOG_FILE"
}

fail() {
  log "ERROR: $1"
  echo "ERROR: $1" >&2
  exit 1
}

# ======================
# Pre-checks
# ======================
if [[ ! -f "$REFRESH_TOKEN_FILE" ]]; then
  fail "Refresh token file not found at $REFRESH_TOKEN_FILE"
fi
REFRESH_TOKEN=$(<"$REFRESH_TOKEN_FILE")

touch "$LOG_FILE" || fail "Cannot write to log file $LOG_FILE"
[ -f "$NEW_FILE" ] && rm -f "$NEW_FILE"

# ======================
# 1. Refresh Access Token
# ======================
log "Starting token refresh..."

# Capture both HTTP status code and response body
response=$(curl -sS -w "\n%{http_code}" -X POST https://www.strava.com/oauth/token \
  -F client_id="$CLIENT_ID" \
  -F client_secret="$CLIENT_SECRET" \
  -F grant_type=refresh_token \
  -F refresh_token="$REFRESH_TOKEN") || fail "curl failed during token refresh"

# Split response and HTTP status code
http_body=$(echo "$response" | sed '$d')
http_code=$(echo "$response" | tail -n1)

log "Token refresh HTTP status: $http_code"
log "Token refresh response body: $http_body"

if [[ "$http_code" -ne 200 ]]; then
  fail "Token refresh failed with HTTP status $http_code. Response: $http_body"
fi

ACCESS_TOKEN=$(echo "$http_body" | jq -r '.access_token // empty') || fail "Failed to parse access_token"
NEW_REFRESH_TOKEN=$(echo "$http_body" | jq -r '.refresh_token // empty') || fail "Failed to parse refresh_token"

if [[ -z "$ACCESS_TOKEN" ]]; then
  fail "Failed to get access token. Response: $http_body"
fi

if [[ -n "$NEW_REFRESH_TOKEN" && "$NEW_REFRESH_TOKEN" != "$REFRESH_TOKEN" ]]; then
  echo "$NEW_REFRESH_TOKEN" > "$REFRESH_TOKEN_FILE" || fail "Failed to write new refresh token"
  log "Refresh token updated and saved."
fi

log "Token refreshed successfully."

# ======================
# 2. Fetch Latest Activities
# ======================
log "Fetching latest 30 activities..."

response=$(curl -sS -w "\n%{http_code}" -H "Authorization: Bearer $ACCESS_TOKEN" \
  "https://www.strava.com/api/v3/athlete/activities?per_page=30") || fail "curl failed during activities fetch"

http_body=$(echo "$response" | sed '$d')
http_code=$(echo "$response" | tail -n1)

log "Activities fetch HTTP status: $http_code"
log "Activities fetch response body: $http_body"

if [[ "$http_code" -ne 200 ]]; then
  fail "Failed to fetch activities with HTTP status $http_code. Response: $http_body"
fi

echo "$http_body" | jq '.' > "$NEW_FILE" || fail "Failed to parse activities JSON"

log "Fetched activities successfully."

# ======================
# 3. Compare & Update File
# ======================
if [[ ! -f "$CURRENT_FILE" ]]; then
  mv "$NEW_FILE" "$CURRENT_FILE" || fail "Failed to save first activities file"
  log "First fetch — saved activities."
else
  if diff -q "$CURRENT_FILE" "$NEW_FILE" > /dev/null; then
    rm -f "$NEW_FILE"
    log "No changes in activities."
  else
    mv "$NEW_FILE" "$CURRENT_FILE" || fail "Failed to update activities file"
    log "Activities updated."
  fi
fi

log "Script finished successfully."
