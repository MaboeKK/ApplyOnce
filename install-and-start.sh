#!/bin/bash
# Install dependencies and start the portal

cd /home/kmaboe/applyonce

echo "Configuring npm cache..."
npm config set cache /home/kmaboe/.npm-cache

echo ""
echo "Installing dependencies (this may take a few minutes)..."
TMPDIR=/home/kmaboe/.npm-tmp npm install --legacy-peer-deps

if [ $? -eq 0 ]; then
  echo ""
  echo "✓ Installation successful!"
  echo ""
  echo "Starting portal on port 3601..."
  echo "Access at: http://localhost:3601"
  echo ""
  npm run dev:portal
else
  echo ""
  echo "✗ Installation failed. Check the output above for errors."
  exit 1
fi
