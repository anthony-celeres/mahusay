import LoginButton from '@/components/login-btn'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { SubmitButton } from '@/components/submit-btn'
import { loginWithEmail } from '@/app/auth/actions'

interface LoginPageProps {
  searchParams: Promise<{
    error?: string
    message?: string
    next?: string
  }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const error = params.error
  const message = params.message
  const next = params.next

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-[#0a0a0a] overflow-hidden text-neutral-900 dark:text-neutral-100 font-sans px-4 py-12 transition-colors duration-150">
      
      {/* Top right floating theme selector */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md px-6 py-8 sm:px-8 bg-white dark:bg-[#0d0d0d] border border-neutral-200 dark:border-neutral-850 rounded-xl shadow-sm flex flex-col items-center">
        
        {/* Brand Logo */}
        <div className="w-10 h-10 bg-neutral-950 dark:bg-white rounded-lg flex items-center justify-center shadow-sm mb-4 select-none">
          <span className="text-lg font-bold text-white dark:text-black">▲</span>
        </div>

        {/* Title */}
        <h1 className="text-xl font-extrabold tracking-tight text-black dark:text-white mb-1 text-center">
          Access your Workspace
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6 text-center">
          Sign in using your account credentials or single sign-on.
        </p>

        {/* Error Alert Box */}
        {error && (
          <div className="w-full mb-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-lg text-red-700 dark:text-red-300 text-xs flex gap-2 items-start">
            <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            <div className="leading-relaxed">
              <strong className="font-bold block mb-0.5">Sign In Failed</strong>
              {decodeURIComponent(error)}
            </div>
          </div>
        )}

        {/* Success Notice Box */}
        {message && (
          <div className="w-full mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900/40 rounded-lg text-emerald-800 dark:text-emerald-300 text-xs flex gap-2 items-start">
            <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
            <div className="leading-relaxed">
              <strong className="font-bold block mb-0.5">Notice</strong>
              {decodeURIComponent(message)}
            </div>
          </div>
        )}

        {/* Email & Password Login Form */}
        <form action={loginWithEmail} className="w-full space-y-4">
          <input type="hidden" name="next" value={next || ''} />

          {/* Email input */}
          <div className="space-y-1">
            <label htmlFor="email" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-55 dark:bg-neutral-950 border border-neutral-250 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-450 dark:focus:ring-neutral-700"
            />
          </div>

          {/* Password input */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                Password
              </label>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-55 dark:bg-neutral-950 border border-neutral-250 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-450 dark:focus:ring-neutral-700"
            />
          </div>

          {/* Submit Action */}
          <SubmitButton label="Sign In" pendingLabel="Signing in..." />
        </form>

        {/* Divider */}
        <div className="flex items-center my-5 w-full">
          <div className="border-t border-neutral-200 dark:border-neutral-800 flex-grow" />
          <span className="mx-3 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">or</span>
          <div className="border-t border-neutral-200 dark:border-neutral-800 flex-grow" />
        </div>

        {/* Google SSO */}
        <LoginButton nextPath={next} className="w-full" />

        {/* Signup redirection link */}
        <div className="mt-6 text-center text-xs">
          <span className="text-neutral-500 dark:text-neutral-400">Don&apos;t have an account? </span>
          <Link
            href={`/auth/signup${next ? `?next=${encodeURIComponent(next)}` : ''}`}
            className="font-bold text-neutral-900 hover:text-black dark:text-neutral-200 dark:hover:text-white underline transition-colors duration-150"
          >
            Sign up
          </Link>
        </div>

        {/* Back to guide */}
        <div className="mt-6 pt-5 border-t border-neutral-200 dark:border-neutral-800 w-full text-center">
          <Link
            href="/"
            className="text-xs font-semibold text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors duration-150 inline-flex items-center gap-1 group"
          >
            <svg className="w-3.5 h-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to User Setup Guide
          </Link>
        </div>
      </div>
    </div>
  )
}
