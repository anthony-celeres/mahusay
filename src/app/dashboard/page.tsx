import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '@/components/logout-btn'
import { ThemeToggle } from '@/components/theme-toggle'
import { SubmitButton } from '@/components/submit-btn'
import { toggleUserRole } from '@/app/auth/actions'

interface DashboardPageProps {
  searchParams: Promise<{
    error?: string
    message?: string
  }>
}

/**
 * Protected Dashboard page.
 * Performs the secure user session check using getUser() on the server,
 * displays user details, and includes role-based access widgets for testing.
 */
export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams
  const errorParam = params.error
  const messageParam = params.message

  const supabase = await createClient()

  // STRICT AUTH CHECK: Cryptographically verify session against Supabase Auth service
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  // Redirect if unauthorized
  if (error || !user) {
    redirect('/auth/login?error=Session expired or unauthorized access')
  }

  const userMetadata = user.user_metadata || {}
  const avatarUrl = userMetadata.avatar_url
  const fullName = userMetadata.full_name || 'Authorized User'
  const email = user.email
  const role = userMetadata.role || 'user'

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 font-sans px-4 py-8 md:py-16 transition-colors duration-150">
      
      {/* Container */}
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* Error Alert Box (e.g. from RBAC redirection) */}
        {errorParam && (
          <div className="w-full p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-xl text-red-700 dark:text-red-300 text-xs sm:text-sm flex gap-3 items-start shadow-sm">
            <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            <div className="leading-relaxed">
              <strong className="font-bold block mb-0.5">RBAC Access Violation</strong>
              {decodeURIComponent(errorParam)}
            </div>
          </div>
        )}

        {/* Message Alert Box */}
        {messageParam && (
          <div className="w-full p-4 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm flex gap-3 items-start shadow-sm">
            <svg className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
            <div className="leading-relaxed">
              <strong className="font-bold block mb-0.5">Notification</strong>
              {decodeURIComponent(messageParam)}
            </div>
          </div>
        )}
        
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
          
          {/* Action Row */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Profile Card */}
          <div className="bg-white dark:bg-[#0d0d0d] border border-neutral-200 dark:border-neutral-850 rounded-xl p-6 flex flex-col items-center text-center shadow-sm h-fit">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={fullName}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-full border border-neutral-200 dark:border-neutral-800 shadow-sm mb-4 select-none"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-neutral-950 dark:bg-white flex items-center justify-center border border-neutral-200 dark:border-transparent shadow-sm mb-4 text-xl font-extrabold text-white dark:text-black uppercase">
                {email?.[0] || 'U'}
              </div>
            )}
            
            <h2 className="text-base font-bold text-black dark:text-white">{fullName}</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 mb-4 select-all break-all">{email}</p>
            
            <div className="w-full pt-4 border-t border-neutral-200 dark:border-neutral-800 text-left">
              <div className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
                Authentication Specs
              </div>
              <div className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Provider:</span>
                  <span className="font-semibold text-black dark:text-white capitalize">{user.app_metadata.provider || 'credentials'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Role Claims:</span>
                  <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] uppercase border ${
                    role === 'admin' 
                      ? 'bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-900/40' 
                      : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800'
                  }`}>
                    {role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Secure Details Block */}
          <div className="md:col-span-2 space-y-6 min-w-0">
            
            {/* RBAC Testing Widget */}
            <div className="bg-white dark:bg-[#0d0d0d] border border-neutral-200 dark:border-neutral-850 rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-black dark:text-white">
                Role-Based Access Control (RBAC) Testing
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                This scaffold includes middleware-level and code-level RBAC. By default, new registrations receive the <strong>&apos;user&apos;</strong> role. Switch your role claims dynamically below to verify protected routing boundaries in action:
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <form action={toggleUserRole} className="w-full sm:w-auto">
                  <SubmitButton 
                    label={role === 'admin' ? "Demote Role to 'user'" : "Promote Role to 'admin'"} 
                    pendingLabel="Updating metadata..." 
                  />
                </form>

                {role === 'admin' ? (
                  <Link
                    href="/dashboard/admin"
                    className="w-full sm:w-auto px-4 py-2.5 bg-purple-600 hover:bg-purple-500 dark:bg-purple-700 dark:hover:bg-purple-600 text-white text-center font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-all duration-150 inline-flex items-center justify-center gap-1.5"
                  >
                    Open Admin Panel
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                  </Link>
                ) : (
                  <button
                    disabled
                    title="Promote role to admin first to access this link"
                    className="w-full sm:w-auto px-4 py-2.5 bg-neutral-200 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-600 text-center font-bold text-xs sm:text-sm rounded-lg border border-neutral-250 dark:border-neutral-800 cursor-not-allowed inline-flex items-center justify-center gap-1.5"
                  >
                    Admin Panel (Blocked)
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Cryptographic check */}
            <div className="bg-white dark:bg-[#0d0d0d] border border-neutral-200 dark:border-neutral-850 rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-black dark:text-white mb-3">
                Secure Data Fetching Verification
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                This page represents a secure route. The proxy layer refreshes your session and enforces access controls, while the component itself performs a final cryptographic check:
              </p>
              
              <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-lg p-3 sm:p-4 font-mono text-[11px] sm:text-xs text-neutral-800 dark:text-neutral-300 overflow-x-auto space-y-1 select-all scrollbar-thin">
                <div><span className="text-neutral-400">{"// Strict verification in Page Server Component:"}</span></div>
                <div><span className="text-neutral-500 dark:text-neutral-400">const</span> supabase = <span className="text-neutral-500 dark:text-neutral-400">await</span> createClient();</div>
                <div><span className="text-neutral-500 dark:text-neutral-400">const</span> &#123; data: &#123; user &#125; &#125; = <span className="text-neutral-500 dark:text-neutral-400">await</span> supabase.auth.getUser();</div>
                <div><span className="text-neutral-500 dark:text-neutral-400">if</span> (!user) &#123; redirect(<span className="text-neutral-900 dark:text-neutral-200">&apos;/auth/login&apos;</span>) &#125;</div>
              </div>
            </div>

            {/* JSON Payload */}
            <div className="bg-white dark:bg-[#0d0d0d] border border-neutral-200 dark:border-neutral-850 rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-black dark:text-white mb-3">
                Full Supabase User Object Payload
              </h3>
              <div className="max-h-60 overflow-auto bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-lg p-3 sm:p-4 font-mono text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 select-all scrollbar-thin">
                <pre className="whitespace-pre-wrap break-all">{JSON.stringify(user, null, 2)}</pre>
              </div>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  )
}
