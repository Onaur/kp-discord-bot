#!/bin/bash
set -e

echo "Running post-merge setup..."
pnpm install
echo "Post-merge setup complete."
