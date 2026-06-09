#!/bin/bash
cd /home/kmaboe/applyonce
export TMPDIR=/home/kmaboe/tmp
mkdir -p $TMPDIR
set -a
source packages/api/.env
set +a
./node_modules/.bin/jest --config packages/api/jest.config.js --runInBand --no-coverage
