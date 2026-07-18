# The mahusay Version Ladder

`mahusay` is a **progressive scaffold**: instead of one monolithic template, it is
built as a ladder of tagged checkpoints. Each tier adds exactly one coherent
capability on top of the previous one, so you can study — or start from — whichever
layer matches what you need.

## How to use it

Every tier is available as an annotated **tag** and a **branch**:

```bash
git clone https://github.com/anthony-celeres/mahusay.git
cd mahusay

git checkout v3          # study the tier as an immutable checkpoint
# or
git checkout stage/v3    # start working from that tier on a branch
```

`main` always points at the newest tier (currently **v6**). The pre-ladder history
is preserved on the `archive/pre-scaffold` branch.

## The tiers

| Tier | Tag / Branch | Adds | New dependencies |
|------|--------------|------|------------------|
| **1** | `v1` / `stage/v1` | Next.js 16 boilerplate — App Router, TypeScript, Tailwind CSS v4, ESLint | `next`, `react`, `tailwindcss` |
| **2** | `v2` / `stage/v2` | Adaptive **dark / light / system** theming, no hydration flash | `next-themes` |
| **3** | `v3` / `stage/v3` | **Supabase** email &amp; password auth (cookie SSR sessions) + page-guarded dashboard | `@supabase/ssr`, `@supabase/supabase-js` |
| **4** | `v4` / `stage/v4` | **Edge route protection** via `proxy.ts` + `?next=` deep-link return flow | — |
| **5** | `v5` / `stage/v5` | **Google OAuth** (PKCE) + `/auth/callback` route handler | — |
| **6** | `v6` / `stage/v6` | **Role-Based Access Control**, admin panel & Row Level Security | — |

## What each tier teaches

- **v1 → v2** — layering client-side state (theming) onto a static app without a backend.
- **v2 → v3** — introducing a database/auth provider and server actions; page-level session guards.
- **v3 → v4** — moving protection to the edge (`proxy.ts`, the Next.js 16 replacement for `middleware.ts`) and returning users to their original destination after login.
- **v4 → v5** — adding a social identity provider through the OAuth PKCE exchange.
- **v5 → v6** — going from *authentication* (who you are) to *authorization* (what you may do): role claims, protected admin routes, and RLS policies in Postgres.

## Contributing a new tier

Add `v7`, `v8`, … as `previous tier + one coherent feature`:

1. Branch from the newest tier, build the feature, keep the diff focused.
2. Update the tier's `README.md` (each tier has a scoped README with this ladder table) and bump `package.json` to `N.0.0`.
3. Tag it (`git tag -a vN`) and push a matching `stage/vN` branch.
4. Fast-forward `main` to the new tip and add a GitHub Release.
