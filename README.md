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

1. Host PocketBase somewhere that stays running (PocketHost, Fly.io, a small VPS). Copy `pocketbase/pb_migrations/` with it, create a superuser, then run `scripts/seed.mjs` against it (or copy the `pb_data` folder).
2. Build the site with the hosted address: `VITE_PB_URL=https://your-pocketbase.example.com npm run build`.
3. Upload `dist/` to any static host. Configure it to serve `index.html` for unknown paths (single-page app routing).
4. In PocketBase settings, restrict allowed origins/CORS to your site's domain if the host supports it.

## Notes

- Seed data and images in `pocketbase/seed/` were exported from the live site's public collections. Registrations and contact inquiries were deliberately not copied.
- `lucide-react` is pinned to 0.454.0 because later versions removed the Facebook icon used in the footer.
