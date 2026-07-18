import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

/**
 * v2 — Theming & UI shell.
 * Adds a light/dark/system theme toggle (next-themes) and dark: variants throughout.
 * Still fully static — no auth or database.
 */
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 font-sans bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 transition-colors duration-150">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-black dark:text-white select-none">▲ mahusay</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
              v2
            </span>
          </div>
          <ThemeToggle />
        </header>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black dark:text-white">
            Adaptive Theming
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
            v2 layers a class-based dark/light/system theme switcher over the v1 boilerplate using
            <code className="mx-1 font-mono text-xs">next-themes</code> and Tailwind v4&apos;s
            <code className="mx-1 font-mono text-xs">@custom-variant dark</code>. Try the toggle above —
            the choice persists and respects your OS preference. No hydration flash.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          {[
            ["Light", "Forced light appearance"],
            ["Dark", "Forced dark appearance"],
            ["System", "Follows OS setting"],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-[#0d0d0d]">
              <div className="font-bold text-black dark:text-white">{title}</div>
              <div className="text-neutral-500 dark:text-neutral-400 text-xs mt-1 leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            href="https://github.com/pacocoursey/next-themes"
            target="_blank"
            className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition-opacity"
          >
            next-themes
          </Link>
        </div>

        <p className="text-xs text-neutral-400 dark:text-neutral-500 border-t border-neutral-200 dark:border-neutral-800 pt-6">
          Next up — <strong>v3</strong>: Supabase email &amp; password authentication.
        </p>
      </div>
    </main>
  )
}
