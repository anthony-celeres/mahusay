import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Next.js 16 Request Interceptor (replaces deprecated middleware.ts).
 * This function intercepts requests to refresh the Supabase auth session,
 * enforces path-based authentication, and performs Role-Based Access Control (RBAC).
 */
export async function proxy(request: NextRequest) {
  // Create an initial response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Instantiate the server-side Supabase client for proxy context
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Refresh the session if needed by calling getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // 1. Protected Route Boundary: Redirect unauthenticated users trying to access /dashboard
  if (pathname.startsWith('/dashboard')) {
    if (!user) {
      const loginUrl = new URL('/auth/login', request.url)
      // Pass the original destination path as a redirect parameter
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // 1b. Role-Based Access Control: Protect admin routes
    if (pathname.startsWith('/dashboard/admin')) {
      const role = user.user_metadata?.role || 'user'
      if (role !== 'admin') {
        const redirectUrl = new URL('/dashboard', request.url)
        redirectUrl.searchParams.set('error', 'Access denied: Admin credentials required')
        return NextResponse.redirect(redirectUrl)
      }
    }
  }

  // 2. Redirect authenticated users away from the login/signup page to the dashboard
  if (pathname === '/auth/login' || pathname === '/auth/signup') {
    if (user) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return response
}

// Config to run the proxy on specific paths, skipping static assets and internal next files
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Public assets like svg, png, etc.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
