import { type Analytics, getAnalytics, isSupported } from 'firebase/analytics'
import { getFirebaseApp } from './app'
import { firebaseFlags } from './config'

let analytics: Analytics | null = null

/**
 * Returns a Firebase Analytics client, or `null` if the service is disabled,
 * unconfigured, or unsupported in the current environment.
 */
export async function getAnalyticsClient(): Promise<Analytics | null> {
  if (!firebaseFlags.analytics) return null
  const app = getFirebaseApp()
  if (!app) return null
  if (analytics) return analytics
  if (!(await isSupported())) return null

  analytics = getAnalytics(app)
  return analytics
}

export { logEvent } from 'firebase/analytics'
