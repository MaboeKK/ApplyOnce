#!/bin/bash
# scripts/restore.sh — Restore ApplyOnce from a Google Drive backup
# Usage: bash scripts/restore.sh 2026-05-31_14-30-00
# (pass the backup folder name; run with no argument to list available backups)

set -e

RCLONE_REMOTE="gdrive"
DRIVE_FOLDER="ApplyOnce-Backups"
DB_CONTAINER="kmaboe-applyonce-postgres"
DB_USER="applyonce"
DB_NAME="applyonce"
RESTORE_DIR="/tmp/applyonce-restore-$$"

# No argument → list available backups
if [ -z "$1" ]; then
  echo "Available backups in Google Drive:"
  rclone lsf "$RCLONE_REMOTE:$DRIVE_FOLDER" --dirs-only
  echo ""
  echo "Usage: bash scripts/restore.sh <backup-folder-name>"
  exit 0
fi

BACKUP="$1"
mkdir -p "$RESTORE_DIR"

echo "▶ Downloading backup $BACKUP from Drive..."
rclone copy "$RCLONE_REMOTE:$DRIVE_FOLDER/$BACKUP" "$RESTORE_DIR" --progress

echo "▶ Restoring database..."
cat "$RESTORE_DIR/applyonce_db.sql" | docker exec -i "$DB_CONTAINER" psql -U "$DB_USER" "$DB_NAME"
echo "  ✓ Database restored"

echo ""
echo "  Code archive downloaded to: $RESTORE_DIR/applyonce_code.tar.gz"
echo "  To extract code:  tar -xzf $RESTORE_DIR/applyonce_code.tar.gz -C /desired/location"
echo "  (then run: npm install  to rebuild node_modules)"
echo ""
echo "✓ Restore complete. Remember: node_modules are NOT in the backup — run npm install."
