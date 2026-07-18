# mahusay · v4 — Edge Route Protection

Adds a **Next.js 16 request interceptor** (`src/proxy.ts`, the replacement for the
deprecated `middleware.ts`) that refreshes the Supabase session and enforces
authentication at the network edge — before any page renders.

## What this version adds (vs v3)

- **`src/proxy.ts`** — refreshes auth cookies and gates `/dashboard`:
  - unauthenticated visitors are redirected to `/auth/login?next=<path>`
  - already-authenticated visitors are bounced away from `/auth/login` and `/auth/signup`
- A **deep-link return flow**: the login Server Action honors the `next` param,
  so users land back on the page they originally requested
- Two layers of defense: the edge proxy **and** the existing per-page `getUser()` check

## How it works

```text
Request → proxy.ts (edge)
            ├─ refresh Supabase session cookies
            ├─ /dashboard/* + no user  → redirect /auth/login?next=…
            └─ /auth/login|signup + user → redirect /dashboard
         → Page Server Component
            └─ getUser() re-verifies before rendering
```

## Setup

Same environment as v3 (`.env.local` with your Supabase URL, anon key, and site URL):

```bash
npm install
npm run dev
```

## New / changed files (vs v3)

```text
src/
├── proxy.ts                # NEW — edge request interceptor
├── app/auth/actions.ts     # loginWithEmail now honors `next`
└── app/auth/login/page.tsx # forwards `next` through the form
```

## The version ladder

| Tag | Adds |
|-----|------|
| `v1` | Next.js 16 boilerplate |
| `v2` | Dark / light / system theming |
| `v3` | Supabase email &amp; password auth |
| **`v4`** | **Edge route protection (`proxy.ts`)** ← you are here |
| `v5` | Google OAuth (PKCE) |
| `v6` | Role-Based Access Control (RBAC) + admin panel |

> Next up — **v5**: Google OAuth via the PKCE flow.
