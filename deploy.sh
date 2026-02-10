#!/bin/bash
# Flu Akademi — VPS Deploy Script
# Deploys to tools.fluakademi.cloud/fluakademi

set -e

PROJECT_DIR="/Users/ibrahimkaraaslan/.gemini/antigravity/scratch/fluakademi"
VPS_USER="root"
VPS_HOST="72.60.33.60"
VPS_DIR="/var/www/tools/fluakademi"

echo "🔨 Building production bundle..."
cd "$PROJECT_DIR"
rm -rf .next
npx next build

echo "📦 Uploading to VPS..."
# Standalone server
scp -r .next/standalone/* ${VPS_USER}@${VPS_HOST}:${VPS_DIR}/

# Static assets (must be under .next/static)
ssh ${VPS_USER}@${VPS_HOST} "mkdir -p ${VPS_DIR}/.next/static"
scp -r .next/static/* ${VPS_USER}@${VPS_HOST}:${VPS_DIR}/.next/static/

# Public assets
scp -r public/* ${VPS_USER}@${VPS_HOST}:${VPS_DIR}/public/

echo "🔄 Restarting PM2 process..."
ssh ${VPS_USER}@${VPS_HOST} "cd ${VPS_DIR} && PORT=3001 pm2 restart fluakademi || PORT=3001 pm2 start server.js --name fluakademi"

echo "✅ Deploy complete! https://tools.fluakademi.cloud/fluakademi"
