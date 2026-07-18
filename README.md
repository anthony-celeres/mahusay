# mahusay · v1 — Next.js 16 Boilerplate

The bare starting point of the **mahusay** scaffold ladder. A clean Next.js 16
(App Router) + TypeScript + Tailwind CSS v4 project with nothing else layered on
top yet — the foundation every later tier builds from.

## What this version includes

- **Next.js 16** App Router (`src/app`) with React Server Components
- **TypeScript** (strict) with the `@/*` path alias
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **ESLint** (`eslint-config-next` flat config)
- A single static landing page — no auth, theming, or database

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## File structure

```text
src/
├── app/
│   ├── layout.tsx    # Root layout + fonts
│   ├── page.tsx      # Static landing page
│   └── globals.css   # Tailwind v4 directives
```

## The version ladder

This repo is a **progressive scaffold** — each tag adds one capability. Check out
any tag with `git checkout <tag>`.

| Tag | Adds |
|-----|------|
| **`v1`** | **Next.js 16 boilerplate** ← you are here |
| `v2` | Dark / light / system theming |
| `v3` | Supabase email &amp; password auth |
| `v4` | Edge route protection (`proxy.ts`) |
| `v5` | Google OAuth (PKCE) |
| `v6` | Role-Based Access Control (RBAC) + admin panel |

> Next up — **v2**: adaptive theming with `next-themes`.
