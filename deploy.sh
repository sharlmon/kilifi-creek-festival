#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="/var/www/kilifi-creek-festival"
HTTPDOCS="/var/www/vhosts/kilificreekfestival.com/httpdocs"
OWNER="kilificreekfestival._g7tv0aef0tj:psacln"

echo "=== [1/6] Navigating to repository directory ==="
cd "$REPO_DIR"

echo "=== [2/6] Pulling latest changes (fast-forward only) ==="
git pull --ff-only

echo "=== [3/6] Installing dependencies ==="
npm ci

echo "=== [4/6] Building production static site with root base URL ==="
NUXT_APP_BASE_URL=/ npm run build:pages

echo "=== [5/6] Validating output and setting permissions ==="
test -f "$REPO_DIR/.output/public/index.html" || { echo "Error: index.html not found in build output"; exit 1; }
test -f "$REPO_DIR/.output/public/about/index.html" || { echo "Error: about/index.html not found"; exit 1; }
test -f "$REPO_DIR/.output/public/screenings/index.html" || { echo "Error: screenings/index.html not found"; exit 1; }
test -f "$REPO_DIR/.output/public/industry/index.html" || { echo "Error: industry/index.html not found"; exit 1; }
test -f "$REPO_DIR/.output/public/team/index.html" || { echo "Error: team/index.html not found"; exit 1; }
test -f "$REPO_DIR/.output/public/partners/index.html" || { echo "Error: partners/index.html not found"; exit 1; }
test -f "$REPO_DIR/.output/public/contact/index.html" || { echo "Error: contact/index.html not found"; exit 1; }

chmod 755 "$REPO_DIR" "$REPO_DIR/.output"
find "$REPO_DIR/.output/public" -type d -exec chmod 755 {} +
find "$REPO_DIR/.output/public" -type f -exec chmod 644 {} +

if [ -d "$HTTPDOCS" ]; then
    rsync -av --delete --checksum "$REPO_DIR/.output/public/" "$HTTPDOCS/"
    chown -R "$OWNER" "$HTTPDOCS/"
fi

echo "=== [6/6] Validating Nginx configuration and reloading ==="
nginx -t
nginx -s reload

echo "=== Deployment completed successfully! ==="
