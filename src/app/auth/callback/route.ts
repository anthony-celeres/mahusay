import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

/**
 * Route Handler to catch the Google OAuth callback code.
 * It exchanges the temporary PKCE code for a Supabase session,
 * saving the access and refresh tokens to cookies, then redirects to the target page.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // In production, respect the forwarded host header if present (e.g. behind load balancers/Vercel proxy)
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // If there's an error exchanging the code, redirect user to the login screen with an error param
  return NextResponse.redirect(`${origin}/auth/login?error=Could not exchange auth code for session`)
}
