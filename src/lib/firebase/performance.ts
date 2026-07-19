import { type FirebasePerformance, getPerformance } from 'firebase/performance'
import { getFirebaseApp } from './app'
import { firebaseFlags } from './config'

let perf: FirebasePerformance | null = null

/**
 * Returns a Firebase Performance Monitoring client, or `null` if the service is
 * disabled or unconfigured. Initializing it automatically collects page-load
 * and network traces.
 */
export function getPerformanceClient(): FirebasePerformance | null {
  if (typeof window === 'undefined') return null
  if (!firebaseFlags.performance) return null
  const app = getFirebaseApp()
  if (!app) return null

  if (!perf) perf = getPerformance(app)
  return perf
}
