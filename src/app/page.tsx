import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

/**
 * v3–v5 — Auth-enabled landing page.
 * Adds a header "Login" entry point into the authentication flow.
 * (v3: email/password. v4: adds edge route protection. v5: adds Google OAuth.)
 */
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 font-sans bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 transition-colors duration-150">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-black dark:text-white select-none">▲ mahusay</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
              auth
            </span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-black font-medium text-xs rounded-lg transition-all duration-200 shadow-sm inline-flex items-center gap-1.5"
            >
              Login
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </header>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black dark:text-white">
            Supabase Authentication
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
            This tier wires up <code className="mx-1 font-mono text-xs">@supabase/ssr</code> for
            cookie-based server-side sessions. Register an account, sign in, and land on a protected
            dashboard. Configure your Supabase keys in <code className="font-mono text-xs">.env.local</code> first.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {[
            ["Server Actions", "Login / signup / signout run on the server"],
            ["@supabase/ssr", "Cookie session sync across server & client"],
            ["Protected route", "The /dashboard workspace requires a session"],
            ["getUser()", "Cryptographic session verification"],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-[#0d0d0d]">
              <div className="font-bold text-black dark:text-white">{title}</div>
              <div className="text-neutral-500 dark:text-neutral-400 text-xs mt-1 leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            href="/auth/signup"
            className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            Create an account
          </Link>
        </div>
      </div>
    </main>
  )
}
