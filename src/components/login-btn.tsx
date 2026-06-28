'use client'

import { useState } from 'react'
import { signInWithGoogle } from '@/app/auth/actions'

interface LoginButtonProps {
  nextPath?: string
  className?: string
}

export default function LoginButton({ nextPath, className = '' }: LoginButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    try {
      await signInWithGoogle(nextPath)
    } catch (err) {
      console.error('Google Sign-In Error:', err)
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      className={`flex items-center justify-center gap-3 px-5 py-3 w-full max-w-sm mx-auto text-sm font-semibold rounded-lg transition-all duration-200 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-black border border-neutral-300 dark:border-transparent shadow-sm hover:shadow active:scale-98 disabled:opacity-75 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
        <svg className="w-4 h-4 animate-spin text-neutral-400 dark:text-neutral-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <svg className="w-4 h-4 transition-transform duration-200 hover:scale-105" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.745 1.055 15.027 0 12 0 7.355 0 3.391 2.673 1.473 6.564l3.793 3.201z"
          />
          <path
            fill="#34A853"
            d="M16.04 15.345c-1.073.719-2.455 1.155-4.04 1.155-2.734 0-5.055-1.846-5.882-4.327l-3.8 3.209C4.245 19.345 7.845 22 12 22c3.09 0 5.927-1.009 8.045-2.909l-4.005-3.746z"
          />
          <path
            fill="#4285F4"
            d="M23.773 12.273c0-.818-.082-1.609-.227-2.373H12v4.509h6.609a5.645 5.645 0 0 1-2.455 3.71l4.005 3.745c2.345-2.163 3.614-5.345 3.614-9.591z"
          />
          <path
            fill="#FBBC05"
            d="M6.158 12.173a7.172 7.172 0 0 1 0-2.409l-3.79-3.2A11.96 11.96 0 0 0 1 12c0 2.01.5 3.91 1.373 5.591l3.785-3.418z"
          />
        </svg>
      )}
      
      <span className="font-semibold tracking-wide text-xs sm:text-sm">
        {loading ? 'Connecting...' : 'Sign in with Google'}
      </span>
    </button>
  )
}
