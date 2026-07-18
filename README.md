# mahusay · v2 — Adaptive Theming

Adds a **dark / light / system** theme toggle on top of the v1 boilerplate.
Still fully static — no authentication or database yet.

## What this version adds (vs v1)

- **`next-themes`** for class-based theme switching with no hydration flash
- Tailwind v4 `@custom-variant dark (&:where(.dark, .dark *))` wiring
- A reusable `ThemeProvider` and a `ThemeToggle` (light / dark / system)
- `dark:` variants applied across the landing page

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and try the toggle in the
header — your choice persists and respects the OS setting.

## New files (vs v1)

```text
src/
├── app/layout.tsx           # now wraps children in <ThemeProvider>
└── components/
    ├── theme-provider.tsx    # next-themes context wrapper
    └── theme-toggle.tsx      # light / dark / system selector
```

## The version ladder

| Tag | Adds |
|-----|------|
| `v1` | Next.js 16 boilerplate |
| **`v2`** | **Dark / light / system theming** ← you are here |
| `v3` | Supabase email &amp; password auth |
| `v4` | Edge route protection (`proxy.ts`) |
| `v5` | Google OAuth (PKCE) |
| `v6` | Role-Based Access Control (RBAC) + admin panel |

> Next up — **v3**: Supabase email &amp; password authentication.
