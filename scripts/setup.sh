#!/bin/bash
# scripts/setup.sh — ApplyOnce setup for the kmaboe sandbox
# Everything needed is already installed; this script verifies, then sets up the project.
# SAFE: only touches /home/kmaboe/applyonce, only uses kmaboe- Docker resources.

set -e

echo ""
echo "╔══════════════════════════════════════╗"
echo "║   ApplyOnce — Setup (kmaboe sandbox)  ║"
echo "╚══════════════════════════════════════╝"
echo ""

# ─── Verify (do NOT install — already present) ──────────────────────────────
echo "▶ Verifying tools (already installed on this server)..."
for tool in node npm docker git; do
  if command -v $tool &>/dev/null; then
    echo "  ✓ $tool $($tool --version 2>/dev/null | head -1)"
  else
    echo "  ✗ $tool MISSING — unexpected on this server. Stop and check."
    exit 1
  fi
done
echo ""

# ─── Safety check: confirm we're not colliding with GoTurbo ─────────────────
echo "▶ Checking our ports are free (5000, 5001, 5002, 5433, 6380)..."
for port in 3600 3601 3602 3610 3611; do
  if ss -tlnp 2>/dev/null | grep -q ":$port "; then
    echo "  ✗ Port $port is already in use. Stop and investigate before continuing."
    exit 1
  else
    echo "  ✓ Port $port is free"
  fi
done
echo ""

# ─── Start ONLY our Docker infra (postgres + redis) ─────────────────────────
echo "▶ Starting kmaboe-applyonce Postgres + Redis (localhost-only)..."
sudo docker compose up postgres redis -d
echo "  ✓ Containers starting"

echo ""
echo "▶ Waiting for PostgreSQL..."
until sudo docker exec kmaboe-applyonce-postgres pg_isready -U applyonce &>/dev/null; do
  printf "."
  sleep 1
done
echo ""
echo "  ✓ PostgreSQL ready"

# ─── Install dependencies ───────────────────────────────────────────────────
echo ""
echo "▶ Installing dependencies (npm workspaces)..."
npm install
echo "  ✓ Dependencies installed"

# ─── Backend env ────────────────────────────────────────────────────────────
if [ ! -f packages/api/.env ]; then
  cp packages/api/.env.example packages/api/.env
  echo "  ✓ Created packages/api/.env — edit JWT secrets before going live"
fi

# ─── Migrations + seed ──────────────────────────────────────────────────────
echo ""
echo "▶ Running migrations + seeding 26 universities..."
cd packages/api
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
cd ../..
echo "  ✓ Database ready and seeded"

echo ""
echo "╔══════════════════════════════════════╗"
echo "║   Setup complete                      ║"
echo "╚══════════════════════════════════════╝"
echo ""
echo "Start the apps:"
echo "  npm run dev          # all three at once"
echo "  npm run dev:api      # API only      → :3600"
echo "  npm run dev:portal   # student app   → :3601"
echo "  npm run dev:admin    # admin app     → :3602"
echo ""
