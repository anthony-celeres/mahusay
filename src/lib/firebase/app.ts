import { type FirebaseApp, getApps, initializeApp } from 'firebase/app'
import { firebaseConfig, isFirebaseConfigured } from './config'

let app: FirebaseApp | null = null

/**
 * Returns the initialized Firebase app, or `null` when Firebase is not
 * configured (or when called on the server). Safe to call repeatedly — the
 * underlying app is created once and reused.
 */
export function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === 'undefined') return null
  if (!isFirebaseConfigured()) return null

  if (!app) {
    app = getApps().length
      ? getApps()[0]!
      : initializeApp(firebaseConfig as Record<string, string>)
  }
  return app
}
