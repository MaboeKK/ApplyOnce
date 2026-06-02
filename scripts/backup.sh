#!/bin/bash
# scripts/backup.sh — ApplyOnce backup to Google Drive
# Backs up CODE + DATABASE only. Excludes node_modules and other regenerable junk.
# Safe: only reads from /home/kmaboe/applyonce, only writes to a temp dir + your Drive.
#
# One-time setup required:
#   1. sudo apt install rclone   (or: curl https://rclone.org/install.sh | sudo bash)
#   2. rclone config             (create a remote named "gdrive" → Google Drive)
#      On a headless server, choose "N" for auto-config and follow the
#      "authorize on another machine" steps using your laptop's browser.
#
# Usage:
#   bash scripts/backup.sh

set -e

# ─── CONFIG ──────────────────────────────────────────────────────────────────
PROJECT_DIR="/home/kmaboe/applyonce"
RCLONE_REMOTE="gdrive"                       # name of your rclone Google Drive remote
DRIVE_FOLDER="ApplyOnce-Backups"             # folder in your Google Drive
KEEP_DAYS=7                                  # how many days of backups to keep

DB_CONTAINER="kmaboe-applyonce-postgres"
DB_USER="applyonce"
DB_NAME="applyonce"

TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)
TMP_DIR="/tmp/applyonce-backup-$TIMESTAMP"
mkdir -p "$TMP_DIR"

echo ""
echo "╔══════════════════════════════════════╗"
echo "║   ApplyOnce — Backup to Google Drive  ║"
echo "╚══════════════════════════════════════╝"
echo ""

# ─── 1. DATABASE DUMP ────────────────────────────────────────────────────────
echo "▶ Dumping database..."
docker exec "$DB_CONTAINER" pg_dump -U "$DB_USER" "$DB_NAME" > "$TMP_DIR/applyonce_db.sql"
DB_SIZE=$(du -h "$TMP_DIR/applyonce_db.sql" | cut -f1)
echo "  ✓ Database dumped ($DB_SIZE)"

# ─── 2. CODE ARCHIVE (excludes node_modules + regenerable folders) ───────────
echo "▶ Archiving code (excluding node_modules)..."
tar \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='dist' \
  --exclude='build' \
  --exclude='coverage' \
  --exclude='uploads' \
  --exclude='*.log' \
  --exclude='.turbo' \
  -czf "$TMP_DIR/applyonce_code.tar.gz" \
  -C "$(dirname "$PROJECT_DIR")" \
  "$(basename "$PROJECT_DIR")"
CODE_SIZE=$(du -h "$TMP_DIR/applyonce_code.tar.gz" | cut -f1)
echo "  ✓ Code archived ($CODE_SIZE) — node_modules excluded"

# ─── 3. UPLOADS (student documents — small, worth keeping) ───────────────────
if [ -d "$PROJECT_DIR/uploads" ] && [ "$(ls -A "$PROJECT_DIR/uploads" 2>/dev/null)" ]; then
  echo "▶ Archiving uploads..."
  tar -czf "$TMP_DIR/applyonce_uploads.tar.gz" -C "$PROJECT_DIR" uploads
  echo "  ✓ Uploads archived"
fi

# ─── 4. PUSH TO GOOGLE DRIVE ─────────────────────────────────────────────────
echo "▶ Uploading to Google Drive ($RCLONE_REMOTE:$DRIVE_FOLDER/$TIMESTAMP)..."
rclone copy "$TMP_DIR" "$RCLONE_REMOTE:$DRIVE_FOLDER/$TIMESTAMP" --progress
echo "  ✓ Uploaded to Drive"

# ─── 5. ROTATE OLD BACKUPS (keep last KEEP_DAYS) ─────────────────────────────
echo "▶ Cleaning up backups older than $KEEP_DAYS days..."
CUTOFF=$(date -d "$KEEP_DAYS days ago" +%Y-%m-%d)
rclone lsf "$RCLONE_REMOTE:$DRIVE_FOLDER" --dirs-only | while read -r dir; do
  DIR_DATE=$(echo "$dir" | cut -d'_' -f1 | tr -d '/')
  if [[ "$DIR_DATE" < "$CUTOFF" ]]; then
    echo "  - Removing old backup: $dir"
    rclone purge "$RCLONE_REMOTE:$DRIVE_FOLDER/$dir" 2>/dev/null || true
  fi
done
echo "  ✓ Cleanup done"

# ─── 6. CLEAN TEMP ───────────────────────────────────────────────────────────
rm -rf "$TMP_DIR"

echo ""
echo "╔══════════════════════════════════════╗"
echo "║   Backup complete                     ║"
echo "╚══════════════════════════════════════╝"
echo "  Database: $DB_SIZE   |   Code: $CODE_SIZE"
echo "  Location: Google Drive → $DRIVE_FOLDER/$TIMESTAMP"
echo ""
