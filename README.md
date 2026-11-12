# Alliance Française Illawarra website

React + Vite + Tailwind front end with a PocketBase backend. Rebuilt from the Hostinger Horizons site so it can be edited and hosted anywhere.

## Run locally

```bash
npm install
cp .env.example .env          # local dev credentials, already filled in
npm run pb                    # PocketBase on http://127.0.0.1:8090 (admin UI at /_/)
node --env-file=.env scripts/seed.mjs   # first time only: load team/events/classes/terms
npm run dev                   # site on http://127.0.0.1:5173
```

Install PocketBase first if needed (`brew install pocketbase`). The migration in `pocketbase/pb_migrations/` creates the collections the first time PocketBase starts.

## Editing content

| What | Where |
| --- | --- |
| Classes, events, team, term dates | PocketBase admin UI (`/_/`) |
| Registrations and contact messages | PocketBase admin UI (superuser only) |
| Page wording, layout, styling | `src/pages/*.jsx`, `src/components/*.jsx`, `src/index.css` |
| Colours and fonts | CSS variables at the top of `src/index.css` |

## Access rules (set in the migration)

- Public visitors can **read** `team`, `events`, `classes`, `terms`.
- Public visitors can only **create** `class_registrations`, `event_registrations`, `contact_inquiries`. They cannot list or read them.

## Deploying

Production runs on one Hostinger VPS (Ubuntu) at `187.127.124.202`: Caddy serves the built site from `/var/www/afillawarra` with automatic HTTPS and proxies `/hcgi/platform`, `/_/` and `/api` to PocketBase (`/opt/pocketbase`, systemd service `pocketbase`). No Docker. Content (classes, events, team, registrations) lives in PocketBase's `pb_data` on the server and is edited in the admin UI at `/_/`; deploying code never touches it.

```bash
npm run deploy
```

That runs `scripts/deploy.sh`, which needs SSH key access to the server (override the target with `DEPLOY_HOST=user@host`). It builds the site, uploads `dist/`, syncs `pocketbase/pb_migrations/` and `pocketbase/pb_hooks/`, restarts PocketBase only if one of those changed (migrations apply on restart), then checks that the pages and API respond and that registrations are still not publicly listable (403).

Do it by hand if you need to:

```bash
npm run build
rsync -az --delete dist/ root@187.127.124.202:/var/www/afillawarra/
rsync -az pocketbase/pb_migrations/ root@187.127.124.202:/opt/pocketbase/pb_migrations/
rsync -az pocketbase/pb_hooks/ root@187.127.124.202:/opt/pocketbase/pb_hooks/
ssh root@187.127.124.202 'chown -R pocketbase:pocketbase /opt/pocketbase; chmod -R a+rX /var/www/afillawarra; systemctl restart pocketbase'
```

Schema changes always go in a **new** file in `pocketbase/pb_migrations/`; never edit one that has already run.

### Email

Form submissions email `info@afillawarra.com.au` through `pocketbase/pb_hooks/`, using Resend over SMTP. Configure it once in the admin UI under Settings, then Mail (host `smtp.resend.com`, port 465, TLS on, user `resend`, the Resend API key as the password, sender `info@afillawarra.com.au`). Incoming mail for the domain is forwarded by ImprovMX; leave the MX, SPF and ImprovMX DKIM records alone.

### First-time server setup (already done)

Install the PocketBase binary and Caddy, run PocketBase as a systemd service on `127.0.0.1:8090` with `--migrationsDir` and `--hooksDir`, point Caddy at the domain, create a superuser (`pocketbase superuser upsert EMAIL PASS`), then seed with `scripts/seed.mjs` through an SSH tunnel.

## Notes

- Seed data and images in `pocketbase/seed/` were exported from the live site's public collections. Registrations and contact inquiries were deliberately not copied.
- `lucide-react` is pinned to 0.454.0 because later versions removed the Facebook icon used in the footer.
