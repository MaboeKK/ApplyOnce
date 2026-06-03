#!/bin/bash
# Start the student portal (port 3601)

cd /home/kmaboe/applyonce

echo "Installing portal dependencies..."
npm install --workspace=packages/portal --legacy-peer-deps

echo ""
echo "Starting portal on port 3601..."
echo "Access at: http://localhost:3601"
echo ""

npm run dev:portal
