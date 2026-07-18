# mahusay · v5 — Google OAuth (PKCE)

Adds **Google single sign-on** alongside the existing email/password flow, using
Supabase's PKCE OAuth exchange and a dedicated callback Route Handler.

## What this version adds (vs v4)

- **`signInWithGoogle()`** Server Action that starts the OAuth PKCE flow
- **`/auth/callback`** Route Handler that exchanges the authorization code for a session
- A **`LoginButton`** (Google) with a loading state, added to the login screen
- Signup confirmation emails now redirect through `/auth/callback`

## Setup

1. Configure Supabase auth (same `.env.local` as v3/v4).
2. In the [Google Cloud Console](https://console.cloud.google.com): create an
   OAuth consent screen + Web client, and add your Supabase callback as an
   authorized redirect URI:

   ```text
   https://<your-ref>.supabase.co/auth/v1/callback
   ```

3. In **Supabase → Authentication → Providers → Google**, enable the provider and
   paste the Client ID + Secret.
4. Run it:

   ```bash
   npm install
   npm run dev
   ```

## New / changed files (vs v4)

```text
src/
├── app/auth/callback/route.ts  # NEW — PKCE code → session exchange
├── app/auth/actions.ts         # + signInWithGoogle()
├── app/auth/login/page.tsx     # + Google sign-in button & divider
└── components/login-btn.tsx     # NEW — Google button
```

## The version ladder

| Tag | Adds |
|-----|------|
| `v1` | Next.js 16 boilerplate |
| `v2` | Dark / light / system theming |
| `v3` | Supabase email &amp; password auth |
| `v4` | Edge route protection (`proxy.ts`) |
| **`v5`** | **Google OAuth (PKCE)** ← you are here |
| `v6` | Role-Based Access Control (RBAC) + admin panel |

> Next up — **v6**: role-based access control, an admin panel, and Row Level Security.
