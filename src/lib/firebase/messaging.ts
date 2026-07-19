import { type Messaging, getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging'
import { getFirebaseApp } from './app'
import { firebaseFlags } from './config'

let messaging: Messaging | null = null

/**
 * Returns a Firebase Cloud Messaging client, or `null` if the service is
 * disabled, unconfigured, or unsupported (e.g. iOS Safari without PWA install).
 */
export async function getMessagingClient(): Promise<Messaging | null> {
  if (!firebaseFlags.messaging) return null
  const app = getFirebaseApp()
  if (!app) return null
  if (messaging) return messaging
  if (!(await isSupported())) return null

  messaging = getMessaging(app)
  return messaging
}

/**
 * Requests notification permission and returns an FCM registration token, or
 * `null` if unavailable/denied. Requires `NEXT_PUBLIC_FIREBASE_VAPID_KEY`.
 *
 * Note: background message delivery also needs a `firebase-messaging-sw.js`
 * service worker (or the FCM handlers added to the existing `public/sw.js`).
 * See the setup notes in `.env.example`.
 */
export async function requestFcmToken(): Promise<string | null> {
  const client = await getMessagingClient()
  if (!client) return null

  const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
  if (!vapidKey) {
    console.warn('FCM: NEXT_PUBLIC_FIREBASE_VAPID_KEY is not set.')
    return null
  }
  if (typeof Notification === 'undefined') return null

  const permission = await Notification.requestPermission()
  if (permission !== 'granted') return null

  try {
    return await getToken(client, { vapidKey })
  } catch (error) {
    console.error('FCM: failed to get token:', error)
    return null
  }
}

export { onMessage }
