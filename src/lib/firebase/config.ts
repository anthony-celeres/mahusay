/**
 * Firebase configuration + feature flags, all driven by environment variables.
 *
 * Nothing here initializes Firebase — it only reads config. Every service is
 * opt-in: a service stays a no-op unless BOTH the core config is present AND its
 * `NEXT_PUBLIC_FIREBASE_ENABLE_*` flag is turned on. This keeps the scaffold
 * dependency-light and side-effect-free until a developer chooses to use it.
 */

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

/** True only when the minimum config needed to initialize Firebase is present. */
export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId)
}

const enabled = (value: string | undefined): boolean => value === 'true' || value === '1'

/** Per-service opt-in flags. Each defaults to OFF. */
export const firebaseFlags = {
  analytics: enabled(process.env.NEXT_PUBLIC_FIREBASE_ENABLE_ANALYTICS),
  messaging: enabled(process.env.NEXT_PUBLIC_FIREBASE_ENABLE_MESSAGING),
  remoteConfig: enabled(process.env.NEXT_PUBLIC_FIREBASE_ENABLE_REMOTE_CONFIG),
  performance: enabled(process.env.NEXT_PUBLIC_FIREBASE_ENABLE_PERFORMANCE),
}
