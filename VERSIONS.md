# The mahusay Version Ladder

`mahusay` is a **progressive scaffold**: instead of one monolithic template, it is
built as a ladder of tagged checkpoints. Each tier adds exactly one coherent
capability on top of the previous one, so you can study — or start from — whichever
layer matches what you need.

## How to use it

Every tier is an immutable **semver tag** (`vN.0.0`, where the tier number is the
major version) plus a rolling **branch** (`stage/vN`):

```bash
git clone https://github.com/anthony-celeres/mahusay.git
cd mahusay

git checkout v3.0.0      # study the tier as an immutable snapshot
# or
git checkout stage/v3    # start working from the latest of that tier on a branch
```

Fixes to a tier bump the **patch** version (`v3.0.1`); the `vN.0.0` snapshot never
moves. Each tier's `package.json` version matches its tag. `main` always points at
the newest tier (currently **v7.x**). The pre-ladder history is preserved on the
`archive/pre-scaffold` branch.

## The tiers

| Tier | Tag / Branch | Adds | New dependencies |
|------|--------------|------|------------------|
| **1** | `v1.0.0` / `stage/v1` | Next.js 16 boilerplate — App Router, TypeScript, Tailwind CSS v4, ESLint | `next`, `react`, `tailwindcss` |
| **2** | `v2.0.0` / `stage/v2` | Adaptive **dark / light / system** theming, no hydration flash | `next-themes` |
| **3** | `v3.0.0` / `stage/v3` | **Supabase** email &amp; password auth (cookie SSR sessions) + page-guarded dashboard | `@supabase/ssr`, `@supabase/supabase-js` |
| **4** | `v4.0.0` / `stage/v4` | **Edge route protection** via `proxy.ts` + `?next=` deep-link return flow | — |
| **5** | `v5.0.0` / `stage/v5` | **Google OAuth** (PKCE) + `/auth/callback` route handler | — |
| **6** | `v6.0.0` / `stage/v6` | **Role-Based Access Control**, admin panel & Row Level Security | — |
| **7** | `v7.0.0` / `stage/v7` | **Progressive Web App** — manifest, installable, offline fallback & auth-aware service-worker caching | — |

## What each tier teaches

- **v1 → v2** — layering client-side state (theming) onto a static app without a backend.
- **v2 → v3** — introducing a database/auth provider and server actions; page-level session guards.
- **v3 → v4** — moving protection to the edge (`proxy.ts`, the Next.js 16 replacement for `middleware.ts`) and returning users to their original destination after login.
- **v4 → v5** — adding a social identity provider through the OAuth PKCE exchange.
- **v5 → v6** — going from *authentication* (who you are) to *authorization* (what you may do): role claims, protected admin routes, and RLS policies in Postgres.
- **v6 → v7** — turning the app into an installable Progressive Web App: a web manifest, a service worker with an *auth-aware* cache strategy (never caches `/dashboard` or `/auth`), and an offline fallback.

## Contributing a new tier

Add tier 7, 8, … as `previous tier + one coherent feature`:

1. Branch from the newest tier, build the feature, keep the diff focused.
2. Update the tier's `README.md` (each tier has a scoped README with this ladder table) and set `package.json` to `N.0.0`.
3. Tag it (`git tag -a vN.0.0`) and push a matching `stage/vN` branch.
4. Fast-forward `main` to the new tip and add a GitHub Release.

**Fixing an existing tier:** edit the tier, then cut a **patch** tag — `vN.0.1` — on
every tier the change flows into (because the tiers stack, a fix to tier 3 usually
also lands in 4–6). The original `vN.0.0` snapshots are immutable and never move.
