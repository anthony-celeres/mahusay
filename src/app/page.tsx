import Link from "next/link"

/**
 * v1 — Bare boilerplate landing page.
 * A static Server Component. No auth, no theming, no database.
 * This is the `create-next-app` baseline the rest of the ladder builds on.
 */
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 font-sans">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight select-none">▲ mahusay</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 border border-neutral-200 text-neutral-600">
            v1
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Next.js 16 Boilerplate
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 leading-relaxed">
            The bare starting point of the mahusay scaffold ladder: Next.js 16 (App Router),
            TypeScript, and Tailwind CSS v4. No authentication, theming, or database yet — those
            arrive one tier at a time in v2 through v6.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {[
            ["App Router", "React Server Components & the src/app directory"],
            ["TypeScript", "Strict, path-aliased (@/*) configuration"],
            ["Tailwind CSS v4", "Utility-first styling via @tailwindcss/postcss"],
            ["ESLint", "eslint-config-next flat config"],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-xl border border-neutral-200 p-4">
              <div className="font-bold">{title}</div>
              <div className="text-neutral-500 text-xs mt-1 leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            href="https://nextjs.org/docs"
            target="_blank"
            className="px-4 py-2 rounded-lg bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors"
          >
            Next.js Docs
          </Link>
          <Link
            href="https://tailwindcss.com/docs"
            target="_blank"
            className="px-4 py-2 rounded-lg border border-neutral-200 font-medium hover:bg-neutral-50 transition-colors"
          >
            Tailwind Docs
          </Link>
        </div>

        <p className="text-xs text-neutral-400 border-t border-neutral-200 pt-6">
          Next up — <strong>v2</strong>: adaptive dark/light/system theming.
        </p>
      </div>
    </main>
  )
}
