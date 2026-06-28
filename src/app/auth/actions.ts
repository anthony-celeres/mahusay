'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

/**
 * Server Action to initiate Google OAuth sign-in.
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
  const next = formData.get('next') as string || '/dashboard'
  
  if (!email || !password) {
    redirect(`/auth/login?error=${encodeURIComponent('Email and password are required')}`)
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirect(`/auth/login?error=${encodeURIComponent(error.message)}`)
  }

  // Attempt to write an audit log (fails gracefully if table is not created yet)
  await supabase.from('audit_logs').insert({
    user_email: email,
    action: 'Logged in with email credentials',
    status: 'SUCCESS',
  })

  redirect(next)
}

/**
 * Server Action to sign up with Email and Password.
 * Assigns a default user role of 'user' inside user_metadata.
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
      data: {
        role: 'user', // Default role assigned in user_metadata
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (error) {
    redirect(`/auth/signup?error=${encodeURIComponent(error.message)}`)
  }

  // Attempt to write a signup audit log
  await supabase.from('audit_logs').insert({
    user_email: email,
    action: 'Registered new credentials account (default user role)',
    status: 'SUCCESS',
  })

  redirect('/auth/login?message=Check your inbox for a confirmation email to complete registration.')
}

/**
 * Server Action to toggle the user's role between 'user' and 'admin' for testing RBAC.
 */
export async function toggleUserRole() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?error=Authentication required')
  }

  const currentRole = user.user_metadata?.role || 'user'
  const newRole = currentRole === 'admin' ? 'user' : 'admin'

  const { error } = await supabase.auth.updateUser({
    data: {
      role: newRole,
    },
  })

  if (error) {
    redirect(`/dashboard?error=${encodeURIComponent(error.message)}`)
  }

  // Write role toggled action log to database
  await supabase.from('audit_logs').insert({
    user_email: user.email,
    action: `Toggled user role metadata to: ${newRole}`,
    status: 'SUCCESS',
  })

  redirect(newRole === 'admin' ? '/dashboard/admin' : '/dashboard')
}

/**
 * Server Action to sign out.
 */
export async function signOutAction() {
  const supabase = await createClient()
  
  // Retrieve user email to log sign out
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    await supabase.from('audit_logs').insert({
      user_email: user.email,
      action: 'Signed out from session',
      status: 'SUCCESS',
    })
  }

  await supabase.auth.signOut()
  redirect('/')
}
