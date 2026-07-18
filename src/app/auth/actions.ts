'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

/**
 * Server Action to initiate Google OAuth sign-in (PKCE flow).
 */
export async function signInWithGoogle(nextPath?: string) {
  const supabase = await createClient()

  const headersList = await headers()
  const host = headersList.get('host')

  const isDev = process.env.NODE_ENV === 'development' || host?.includes('localhost')
  const protocol = isDev ? 'http' : 'https'

  const callbackUrl = new URL('/auth/callback', `${protocol}://${host}`)
  if (nextPath) {
    callbackUrl.searchParams.set('next', nextPath)
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: callbackUrl.toString(),
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    console.error('OAuth configuration or request error:', error.message)
    redirect(`/auth/login?error=${encodeURIComponent(error.message)}`)
  }

  if (data?.url) {
    redirect(data.url)
  }
}

/**
 * Server Action to log in with Email and Password.
 */
export async function loginWithEmail(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const next = (formData.get('next') as string) || '/dashboard'

  if (!email || !password) {
    redirect(`/auth/login?error=${encodeURIComponent('Email and password are required')}`)
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect(`/auth/login?error=${encodeURIComponent(error.message)}`)
  }

  redirect(next)
}

/**
 * Server Action to sign up with Email and Password.
 * The confirmation email now redirects through the OAuth callback route so the
 * PKCE code can be exchanged for a session.
 */
export async function signupWithEmail(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    redirect(`/auth/signup?error=${encodeURIComponent('Email and password are required')}`)
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (error) {
    redirect(`/auth/signup?error=${encodeURIComponent(error.message)}`)
  }

  redirect('/auth/login?message=Check your inbox for a confirmation email to complete registration.')
}

/**
 * Server Action to sign out.
 */
export async function signOutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
