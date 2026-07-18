# mahusay · v3 — Supabase Email &amp; Password Auth

Wires up **Supabase** authentication with cookie-based server-side sessions
(`@supabase/ssr`). Users can register, sign in, sign out, and reach a
page-guarded dashboard.

## What this version adds (vs v2)

- **`@supabase/ssr` + `@supabase/supabase-js`** clients (browser + server)
- **Server Actions** for email/password login, signup, and signout
- A **page-guarded** `/dashboard` that verifies the session with `getUser()`
- A reusable `SubmitButton` (React 19 `useFormStatus`) and `LogoutButton`
- A committed **`.env.example`** template

> Route protection here is **page-level only** (each Server Component checks the
> session). v4 adds an earlier, edge-level guard via `proxy.ts`.

## Setup

1. Create a project at the [Supabase Dashboard](https://supabase.com/dashboard)
   and copy the **Project URL** and **anon public key** (Settings → API).
2. Configure your environment:

   ```bash
   cp .env.example .env.local
   ```

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://<your-ref>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. Run it:

   ```bash
   npm install
   npm run dev
   ```

## New files (vs v2)

```text
src/
├── app/auth/
│   ├── actions.ts          # login / signup / signout Server Actions
│   ├── login/page.tsx      # credentials login form
│   └── signup/page.tsx     # registration form
├── app/dashboard/page.tsx  # protected workspace (page-level guard)
├── components/
│   ├── submit-btn.tsx      # useFormStatus submit button
│   └── logout-btn.tsx      # sign-out control
└── utils/supabase/
    ├── client.ts           # browser client
    └── server.ts           # server client (async cookies)
```

## The version ladder

| Tag | Adds |
|-----|------|
| `v1` | Next.js 16 boilerplate |
| `v2` | Dark / light / system theming |
| **`v3`** | **Supabase email &amp; password auth** ← you are here |
| `v4` | Edge route protection (`proxy.ts`) |
| `v5` | Google OAuth (PKCE) |
| `v6` | Role-Based Access Control (RBAC) + admin panel |

> Next up — **v4**: edge-level route protection with `proxy.ts`.
