import {
  type RemoteConfig,
  fetchAndActivate,
  getRemoteConfig,
  getValue,
} from 'firebase/remote-config'
import { getFirebaseApp } from './app'
import { firebaseFlags } from './config'

let remoteConfig: RemoteConfig | null = null

/**
 * Returns a Firebase Remote Config client, or `null` if the service is
 * disabled or unconfigured. Call `fetchAndActivate(client)` then `getValue()`
 * to read server-controlled feature flags.
 */
export function getRemoteConfigClient(): RemoteConfig | null {
  if (typeof window === 'undefined') return null
  if (!firebaseFlags.remoteConfig) return null
  const app = getFirebaseApp()
  if (!app) return null

  if (!remoteConfig) {
    remoteConfig = getRemoteConfig(app)
    // Reasonable default for production; lower it during local development.
    remoteConfig.settings.minimumFetchIntervalMillis = 3_600_000
  }
  return remoteConfig
}

export { fetchAndActivate, getValue }
