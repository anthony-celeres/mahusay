import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { SubmitButton } from '@/components/submit-btn'
import { signupWithEmail } from '@/app/auth/actions'

interface SignupPageProps {
  searchParams: Promise<{
    error?: string
    next?: string
  }>
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams
  const error = params.error
  const next = params.next

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-[#0a0a0a] overflow-hidden text-neutral-900 dark:text-neutral-100 font-sans px-4 py-12 transition-colors duration-150">
      
      {/* Top right floating theme selector */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Main Registration Card */}
      <div className="relative z-10 w-full max-w-md px-6 py-8 sm:px-8 bg-white dark:bg-[#0d0d0d] border border-neutral-200 dark:border-neutral-850 rounded-xl shadow-sm flex flex-col items-center">
        
        {/* Brand Logo */}
        <div className="w-10 h-10 bg-neutral-950 dark:bg-white rounded-lg flex items-center justify-center shadow-sm mb-4 select-none">
          <span className="text-lg font-bold text-white dark:text-black">▲</span>
        </div>

        {/* Title */}
        <h1 className="text-xl font-extrabold tracking-tight text-black dark:text-white mb-1 text-center">
          Create your Account
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6 text-center">
          Register a manual developer account to test client operations.
        </p>

        {/* Error Alert Box */}
        {error && (
          <div className="w-full mb-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-lg text-red-700 dark:text-red-300 text-xs flex gap-2 items-start">
            <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            <div className="leading-relaxed">
              <strong className="font-bold block mb-0.5">Registration Failed</strong>
              {decodeURIComponent(error)}
            </div>
          </div>
        )}

        {/* Email & Password Registration Form */}
        <form action={signupWithEmail} className="w-full space-y-4">
          
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
            <label htmlFor="password" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-55 dark:bg-neutral-950 border border-neutral-250 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-450 dark:focus:ring-neutral-700"
            />
            <p className="text-[10px] text-neutral-400">Password must be at least 6 characters.</p>
          </div>

          {/* Submit Action */}
          <SubmitButton label="Sign Up" pendingLabel="Registering..." />
        </form>

        {/* Login redirection link */}
        <div className="mt-6 text-center text-xs w-full pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <span className="text-neutral-500 dark:text-neutral-400">Already have an account? </span>
          <Link
            href={`/auth/login${next ? `?next=${encodeURIComponent(next)}` : ''}`}
            className="font-bold text-neutral-900 hover:text-black dark:text-neutral-200 dark:hover:text-white underline transition-colors duration-150"
          >
            Log in
          </Link>
        </div>

        {/* Back to guide */}
        <div className="mt-4 text-center text-xs">
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
