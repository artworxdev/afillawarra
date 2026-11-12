#!/usr/bin/env bash
# Deploy the site and PocketBase backend files to the production server.
#   npm run deploy
# Override the target with DEPLOY_HOST=user@host. Needs SSH key access.
set -euo pipefail

HOST="${DEPLOY_HOST:-root@187.127.124.202}"
DOMAIN="${DEPLOY_DOMAIN:-https://afillawarra.com.au}"
cd "$(dirname "$0")/.."

echo "==> Building site"
npm run build --silent

echo "==> Syncing PocketBase migrations and hooks"
# -rlc: recurse, keep links, compare by checksum (ignore owner/time noise).
# Migrations are never deleted on the server; hooks are mirrored.
changed=$(
	rsync -rlc -i pocketbase/pb_migrations/ "$HOST:/opt/pocketbase/pb_migrations/"
	rsync -rlc -i --delete pocketbase/pb_hooks/ "$HOST:/opt/pocketbase/pb_hooks/"
)
changed=$(printf '%s\n' "$changed" | grep -E '^(<f|\*deleting)' || true)

echo "==> Uploading site"
rsync -rlc --delete dist/ "$HOST:/var/www/afillawarra/"

echo "==> Fixing permissions"
ssh "$HOST" 'chown -R pocketbase:pocketbase /opt/pocketbase/pb_migrations /opt/pocketbase/pb_hooks; chmod -R a+rX /var/www/afillawarra'

if [ -n "$changed" ]; then
	echo "==> Backend files changed, restarting PocketBase:"
	printf '%s\n' "$changed" | sed 's/^/    /'
	ssh "$HOST" 'systemctl restart pocketbase; sleep 3'
else
	echo "==> No backend changes, PocketBase not restarted"
fi
ssh "$HOST" 'systemctl is-active --quiet pocketbase caddy' || { echo "pocketbase or caddy is not running"; exit 1; }

echo "==> Verifying $DOMAIN"
fail=0
for p in / /about /classes /events /register /contact; do
	code=$(curl -s -o /dev/null -w '%{http_code}' "$DOMAIN$p")
	[ "$code" = 200 ] || { echo "FAIL $p returned $code"; fail=1; }
done
code=$(curl -s -o /dev/null -w '%{http_code}' "$DOMAIN/hcgi/platform/api/collections/events/records?perPage=1")
[ "$code" = 200 ] || { echo "FAIL events API returned $code"; fail=1; }
code=$(curl -s -o /dev/null -w '%{http_code}' "$DOMAIN/hcgi/platform/api/collections/contact_inquiries/records")
[ "$code" = 403 ] || { echo "FAIL inquiries list returned $code (expected 403)"; fail=1; }
[ "$fail" = 0 ] || exit 1
echo "Deployed. Live bundle: $(curl -s "$DOMAIN/" | grep -o 'assets/index-[A-Za-z0-9_-]*\.js')"
