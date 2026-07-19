<div align="center">

# ▲ mahusay

**A progressive, production-ready Next.js 16 scaffold — learn or launch full-stack authentication one tier at a time.**

<sub><em>mahusay</em> — Filipino for <em>“excellent / well-made.”</em></sub>

<br>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-SSR-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

[Quick Start](#-quick-start) · [Features](#-features) · [Version Ladder](#-version-ladder) · [Full Setup](#-full-setup-guide) · [Architecture](#-security--rbac-architecture)

</div>

---

## <img src="https://api.iconify.design/lucide/info.svg?color=%236366f1" width="20" height="20" alt=""> What is this?

**mahusay** is an open-source scaffold for building full-stack web apps with **Next.js 16**, **Supabase** cookie-based auth, and **Google OAuth** — with role-based access control wired in.

What makes it different: it's a **progressive ladder**. Instead of one monolithic template you have to reverse-engineer, mahusay is published as seven tagged tiers — from a bare Next.js boilerplate up to full RBAC and an installable PWA. Check out the tier that matches your needs, or walk them in order to *learn* how each layer is built. See the [Version Ladder](#-version-ladder).

## <img src="https://api.iconify.design/lucide/sparkles.svg?color=%236366f1" width="20" height="20" alt=""> Features

| | |
|---|---|
| <img src="https://api.iconify.design/lucide/zap.svg?color=%236366f1" width="18" height="18" alt=""> **Next.js 16 App Router** | React Server Components, Server Actions, Route Handlers, React 19 |
| <img src="https://api.iconify.design/lucide/lock.svg?color=%236366f1" width="18" height="18" alt=""> **Supabase Auth (SSR)** | Cookie-based server-side sessions via `@supabase/ssr` |
| <img src="https://api.iconify.design/lucide/key-round.svg?color=%236366f1" width="18" height="18" alt=""> **Google OAuth** | Full PKCE flow with a dedicated callback handler |
| <img src="https://api.iconify.design/lucide/shield.svg?color=%236366f1" width="18" height="18" alt=""> **Edge route protection** | `proxy.ts` — the Next.js 16 replacement for `middleware.ts` |
| <img src="https://api.iconify.design/lucide/users.svg?color=%236366f1" width="18" height="18" alt=""> **Role-Based Access Control** | Protected admin panel + Postgres Row Level Security |
| <img src="https://api.iconify.design/lucide/sun-moon.svg?color=%236366f1" width="18" height="18" alt=""> **Adaptive theming** | Dark / light / system with no hydration flash |
| <img src="https://api.iconify.design/lucide/puzzle.svg?color=%236366f1" width="18" height="18" alt=""> **Progressive tiers** | Start from any layer via an immutable semver tag |
| <img src="https://api.iconify.design/lucide/smartphone.svg?color=%236366f1" width="18" height="18" alt=""> **Installable PWA** | Add-to-home-screen, offline fallback, auth-aware caching |
| <img src="https://api.iconify.design/lucide/file-code.svg?color=%236366f1" width="18" height="18" alt=""> **Typed & linted** | Strict TypeScript, ESLint, Tailwind CSS v4 |

## <img src="https://api.iconify.design/lucide/rocket.svg?color=%236366f1" width="20" height="20" alt=""> Quick Start

```bash
git clone https://github.com/anthony-celeres/mahusay.git
cd mahusay
npm install
cp .env.example .env.local     # then add your Supabase keys
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** — you'll land on an interactive setup guide.

> **Want a specific layer?** Start from any tier, e.g. `git checkout v3.0.0` for just email/password auth.
> **Full auth** (login, OAuth, RBAC) needs Supabase configured — see the [Full Setup Guide](#-full-setup-guide).

## <img src="https://api.iconify.design/lucide/layers.svg?color=%236366f1" width="20" height="20" alt=""> Version Ladder

Each tier = the previous tier **+ exactly one capability**. Every tier is an immutable [semver](https://semver.org) tag (the **tier number is the major version**, `vN.0.0`) plus a rolling `stage/vN` branch. Fixes bump the patch (`v3.0.1`). Full details in **[VERSIONS.md](./VERSIONS.md)**.

| Tier | Adds | New dependencies |
|------|------|------------------|
| [`v1.0.0`](https://github.com/anthony-celeres/mahusay/tree/v1.0.0) | Next.js 16 boilerplate (App Router, TS, Tailwind v4) | `next`, `react`, `tailwindcss` |
| [`v2.0.0`](https://github.com/anthony-celeres/mahusay/tree/v2.0.0) | Dark / light / system theming | `next-themes` |
| [`v3.0.0`](https://github.com/anthony-celeres/mahusay/tree/v3.0.0) | Supabase email &amp; password auth | `@supabase/ssr`, `@supabase/supabase-js` |
| [`v4.0.0`](https://github.com/anthony-celeres/mahusay/tree/v4.0.0) | Edge route protection (`proxy.ts`) | — |
| [`v5.0.0`](https://github.com/anthony-celeres/mahusay/tree/v5.0.0) | Google OAuth (PKCE) | — |
| [`v6.0.0`](https://github.com/anthony-celeres/mahusay/tree/v6.0.0) | Role-Based Access Control + admin panel | — |
| **[`v7.0.0`](https://github.com/anthony-celeres/mahusay/tree/v7.0.0)** | **Progressive Web App — installable + offline** *(= `main`)* | — |

## <img src="https://api.iconify.design/lucide/boxes.svg?color=%236366f1" width="20" height="20" alt=""> Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | [Next.js 16](https://nextjs.org/) — App Router, RSC, Server Actions |
| Language | [TypeScript](https://www.typescriptlang.org/) (strict) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) with class-based theming |
| Auth &amp; DB | [Supabase](https://supabase.com/) via `@supabase/ssr` (cookie SSR sessions) |
| Providers | Google OAuth (PKCE) + email/password |
| Access control | RBAC + Postgres Row Level Security (RLS) |

## <img src="https://api.iconify.design/lucide/clipboard-list.svg?color=%236366f1" width="20" height="20" alt=""> Full Setup Guide

Get login, Google OAuth, and RBAC working end-to-end.

<details>
<summary><strong>Step 1 · Supabase project</strong> — get your URL &amp; anon key</summary>

<br>

1. Go to the [Supabase Dashboard](https://supabase.com/dashboard) → **New Project**.
2. Set a **Name**, a strong **Database Password**, and the **Region** closest to your users. Wait ~1–2 min for provisioning.
3. Open **Project Settings → API** and copy the **Project URL** and **anon / public key**.

</details>

<details>
<summary><strong>Step 2 · Google OAuth</strong> — create credentials (optional, for social login)</summary>

<br>

1. In the [Google Cloud Console](https://console.cloud.google.com), create/select a project.
2. **OAuth consent screen** → **External** → fill required fields → add scopes `.../auth/userinfo.email` and `.../auth/userinfo.profile`.
3. **Credentials** → **Create Credentials → OAuth client ID** → **Web application**.
4. Under **Authorized redirect URIs**, add your Supabase callback:
   ```text
   https://<your-supabase-project-ref>.supabase.co/auth/v1/callback
   ```
5. Copy the generated **Client ID** and **Client Secret**.
6. Back in **Supabase → Authentication → Providers → Google**, enable it and paste the Client ID + Secret.

</details>

<details>
<summary><strong>Step 3 · Environment variables</strong></summary>

<br>

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-supabase-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

</details>

<details>
<summary><strong>Step 4 · Run &amp; make yourself an admin</strong></summary>

<br>

```bash
npm run dev
```

Register an account, then either use the **“Promote Role to admin”** button on the dashboard (fastest for local testing), or run in the **Supabase SQL Editor**:

```sql
update auth.users
set raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
where email = 'your-user-email@example.com';
```

</details>

## <img src="https://api.iconify.design/lucide/folder-tree.svg?color=%236366f1" width="20" height="20" alt=""> Project Structure

<details>
<summary>Expand file tree</summary>

```text
mahusay/
├── .env.example              # Template for environment variables
├── package.json              # Dependencies and run scripts
├── src/
│   ├── proxy.ts              # Next.js 16 request interceptor (replaces middleware.ts)
│   ├── app/
│   │   ├── layout.tsx        # Root layout + theme provider
│   │   ├── page.tsx          # Interactive setup guide (landing page)
│   │   ├── globals.css       # Tailwind CSS v4 directives
│   │   ├── dashboard/
│   │   │   ├── page.tsx      # Secure dashboard + role-switch test widget
│   │   │   └── admin/page.tsx# Protected admin panel (audit logs, RLS)
│   │   └── auth/
│   │       ├── callback/route.ts  # PKCE code → session exchange
│   │       ├── login/page.tsx     # Login screen
│   │       ├── signup/page.tsx     # Registration screen
│   │       └── actions.ts          # Server Actions: login, signup, OAuth, signout
│   ├── components/           # theme toggle, submit/login/logout buttons
│   └── utils/supabase/       # browser + server Supabase clients
```

</details>

## <img src="https://api.iconify.design/lucide/shield-check.svg?color=%236366f1" width="20" height="20" alt=""> Security & RBAC Architecture

1. **Edge-level interception (`src/proxy.ts`)** — runs at the network edge on every request: transparently refreshes Supabase session cookies, blocks unauthenticated access to `/dashboard`, and denies `/dashboard/admin` unless the user's `role` metadata claim is `admin`.
2. **Server-side cryptographic validation** — Page Server Components re-verify with `getUser()`, which (unlike `getSession()`) makes an internal request to Supabase Auth to confirm the session and claims haven't been forged:
   ```typescript
   const { data: { user } } = await supabase.auth.getUser()
   ```
3. **RBAC metadata** — new signups default to the `user` role. A `toggleUserRole()` Server Action flips the claim so you can verify routing boundaries live. Postgres **Row Level Security** policies enforce the same role rules at the database layer.

## <img src="https://api.iconify.design/lucide/scale.svg?color=%236366f1" width="20" height="20" alt=""> License

[MIT](./LICENSE) © 2026 Anthony Celeres — free to use, modify, and distribute.

---

<div align="center">
<sub><img src="https://api.iconify.design/lucide/star.svg?color=%236366f1" width="12" height="12" alt=""> Built with Next.js 16, Supabase, and Tailwind CSS · Star the repo if it helped you.</sub>
</div>
