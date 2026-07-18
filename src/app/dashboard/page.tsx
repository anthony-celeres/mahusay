import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/logout-btn'
import { ThemeToggle } from '@/components/theme-toggle'

/**
 * Protected Dashboard page (page-level guard).
 * Performs a secure server-side session check with getUser() and redirects
 * unauthenticated visitors to the login screen. In v4 an edge-level proxy
 * adds a second, earlier layer of protection in front of this check.
 */
export default async function DashboardPage() {
  const supabase = await createClient()

  // STRICT AUTH CHECK: cryptographically verify the session against Supabase Auth
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/auth/login?error=Session expired or unauthorized access')
  }

  const userMetadata = user.user_metadata || {}
  const fullName = userMetadata.full_name || 'Authorized User'
  const email = user.email

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 font-sans px-4 py-8 md:py-16 transition-colors duration-150">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-850">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                Secure Session Active
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-black dark:text-white tracking-tight">
              Developer Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </header>

        {/* Profile Card */}
        <div className="bg-white dark:bg-[#0d0d0d] border border-neutral-200 dark:border-neutral-850 rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
          <div className="w-16 h-16 rounded-full bg-neutral-950 dark:bg-white flex items-center justify-center border border-neutral-200 dark:border-transparent shadow-sm mb-4 text-xl font-extrabold text-white dark:text-black uppercase">
            {email?.[0] || 'U'}
          </div>
          <h2 className="text-base font-bold text-black dark:text-white">{fullName}</h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 mb-4 select-all break-all">{email}</p>

          <div className="w-full pt-4 border-t border-neutral-200 dark:border-neutral-800 text-left">
            <div className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
              Authentication Specs
            </div>
            <div className="flex justify-between text-xs text-neutral-700 dark:text-neutral-300">
              <span className="text-neutral-500">Provider:</span>
              <span className="font-semibold text-black dark:text-white capitalize">{user.app_metadata.provider || 'email'}</span>
            </div>
          </div>
        </div>

        {/* Secure fetching note */}
        <div className="bg-white dark:bg-[#0d0d0d] border border-neutral-200 dark:border-neutral-850 rounded-xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-black dark:text-white mb-3">
            Secure Data Fetching Verification
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
            This page is a protected route. The Server Component performs a final cryptographic
            check before rendering any data:
          </p>
          <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-lg p-3 sm:p-4 font-mono text-[11px] sm:text-xs text-neutral-800 dark:text-neutral-300 overflow-x-auto space-y-1 select-all scrollbar-thin">
            <div><span className="text-neutral-400">{"// Strict verification in Page Server Component:"}</span></div>
            <div><span className="text-neutral-500 dark:text-neutral-400">const</span> supabase = <span className="text-neutral-500 dark:text-neutral-400">await</span> createClient();</div>
            <div><span className="text-neutral-500 dark:text-neutral-400">const</span> &#123; data: &#123; user &#125; &#125; = <span className="text-neutral-500 dark:text-neutral-400">await</span> supabase.auth.getUser();</div>
            <div><span className="text-neutral-500 dark:text-neutral-400">if</span> (!user) &#123; redirect(<span className="text-neutral-900 dark:text-neutral-200">&apos;/auth/login&apos;</span>) &#125;</div>
          </div>
        </div>

      </div>
    </div>
  )
}
