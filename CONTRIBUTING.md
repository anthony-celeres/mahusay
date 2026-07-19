# Contributing to mahusay

First off — thank you! 🎉 mahusay is an open-source scaffold meant to help people
learn and ship full-stack auth faster, and contributions of every size are welcome:
bug fixes, docs, examples, and new tiers.

This guide covers the one thing that makes mahusay unusual — its **stacked, tagged
ladder** — plus the normal fork → branch → PR flow.

---

## Table of contents

- [Code of Conduct](#code-of-conduct)
- [Ways to contribute](#ways-to-contribute)
- [Understand the ladder first](#understand-the-ladder-first)
- [Development setup](#development-setup)
- [Branching & pull requests](#branching--pull-requests)
- [Commit style](#commit-style)
- [Coding standards](#coding-standards)
- [Reporting bugs](#reporting-bugs)
- [Reporting security issues](#reporting-security-issues)

## Code of Conduct

Be kind, be respectful, assume good intent. Harassment, discrimination, or hostile
behavior of any kind is not tolerated. By participating you agree to uphold this in
issues, pull requests, and all project spaces. Report unacceptable behavior privately
to the maintainers via a [GitHub security advisory](https://github.com/anthony-celeres/mahusay/security/advisories/new)
or a direct message.

## Ways to contribute

| Type | How |
|------|-----|
| 🐛 **Bug fix** | Open an issue describing it, then a PR referencing the issue |
| 📖 **Docs** | Typos, clarity, examples — PRs welcome directly |
| ✨ **Feature / improvement** to the current app | Discuss in an issue first for anything non-trivial |
| 🪜 **A new tier** (`v7`, `v8`, …) | Open an issue to propose the capability before building — see below |

## Understand the ladder first

mahusay is **not** a single branch. It's a linear ladder where **each tier builds on
the previous one**:

```
v1.0.0 → v2.0.0 → v3.0.0 → v4.0.0 → v5.0.0 → v6.0.0 (= main)
 boilerplate  theming   auth    route-guard  OAuth     RBAC
```

Two consequences to keep in mind:

1. **Tags are immutable.** `v3.0.0` pins that exact code forever and is never
   force-moved. A fix bumps the **patch** version (`v3.0.1`). Each tier's
   `package.json` version matches its tag major.
2. **A change can ripple.** Because the tiers stack, a fix to an early tier often
   also lives in the later ones. Check the blast radius before you start:
   ```bash
   git log --oneline v1.0.0..main -- src/path/to/file
   ```
   If the file is touched by several tiers, the fix belongs in each of them.

> **Most contributions target the latest app only** (the `main` branch / v6). That's
> the simple case — you don't need to touch tags at all. The ladder rules only matter
> when you're deliberately changing an earlier tier or adding a new one.

## Development setup

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/<your-username>/mahusay.git
cd mahusay

# 2. Install dependencies
npm install

# 3. Configure environment (see README “Full Setup Guide”)
cp .env.example .env.local   # add your Supabase keys

# 4. Run the dev server
npm run dev
```

Before pushing, make sure it builds and lints:

```bash
npm run lint
npm run build
```

## Branching & pull requests

1. Create a topic branch off `main`:
   ```bash
   git checkout -b fix/login-redirect main
   ```
2. Make focused changes — one logical change per PR.
3. Run `npm run lint && npm run build` — both must pass.
4. Push and open a PR **against `main`**, filling in the PR template.
5. A maintainer reviews; once approved it's merged. If your change affects specific
   tiers or tags, a maintainer handles the tag/patch cutting — just call it out in
   your PR description.

**Proposing a new tier?** Open an issue titled `Tier proposal: <capability>` first.
A good tier is *one* coherent capability that builds cleanly on the current top tier,
keeps the diff focused, and passes `npm run build`.

## Commit style

This repo uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(auth): add password-reset flow
fix(proxy): preserve query string on redirect
docs: clarify Google OAuth setup
chore: bump eslint config
```

Common types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`.

## Coding standards

- **TypeScript strict** — no `any` escapes unless truly unavoidable (and commented).
- **ESLint** — `npm run lint` must be clean.
- **Match the surrounding style** — naming, formatting, and comment density.
- Prefer **Server Components / Server Actions**; keep client components small and
  marked `'use client'`.
- Never commit secrets. `.env.local` is gitignored; `.env.example` is the template.

## Reporting bugs

Open a [bug report](https://github.com/anthony-celeres/mahusay/issues/new/choose) and include:

- What you expected vs. what happened
- Steps to reproduce (and the **tier / tag** you're on, e.g. `v3.0.0`)
- Environment: OS, Node version, browser
- Relevant logs or screenshots

## Reporting security issues

**Please do not open a public issue for security vulnerabilities.** Instead, report
privately via a [GitHub security advisory](https://github.com/anthony-celeres/mahusay/security/advisories/new).
We'll acknowledge and work with you on a fix and disclosure timeline.

---

Thanks again for helping make mahusay better. 💚
