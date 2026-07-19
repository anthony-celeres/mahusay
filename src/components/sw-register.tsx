'use client'

import { useEffect } from 'react'

/**
 * Registers the service worker (public/sw.js) on the client after the page loads,
 * enabling installability and offline support. Runs in production only (to avoid
 * caching interfering with local development) and is a no-op where unsupported.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    if (!('serviceWorker' in navigator)) return

    const register = () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .catch((err) => console.error('Service worker registration failed:', err))
    }

    window.addEventListener('load', register)
    return () => window.removeEventListener('load', register)
  }, [])

  return null
}
