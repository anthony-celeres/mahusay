'use client'

import { useEffect } from 'react'
import { firebaseFlags, isFirebaseConfigured } from '@/lib/firebase/config'

/**
 * Initializes the "ambient" Firebase services (Analytics, Performance) on the
 * client after mount, but only when Firebase is configured AND the service is
 * enabled via its env flag. Each service is loaded with a dynamic import, so
 * disabled services add nothing to the bundle.
 *
 * On-demand services (Cloud Messaging, Remote Config) are NOT started here —
 * call their getters from your own code when you actually need them.
 */
export function FirebaseInit() {
  useEffect(() => {
    if (!isFirebaseConfigured()) return

    if (firebaseFlags.analytics) {
      import('@/lib/firebase/analytics')
        .then((m) => m.getAnalyticsClient())
        .catch((err) => console.error('Firebase Analytics init failed:', err))
    }

    if (firebaseFlags.performance) {
      import('@/lib/firebase/performance')
        .then((m) => m.getPerformanceClient())
        .catch((err) => console.error('Firebase Performance init failed:', err))
    }
  }, [])

  return null
}
