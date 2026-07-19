/*
 * mahusay service worker — installable PWA with an AUTH-AWARE cache strategy.
 *
 * Key rule: never cache authenticated or dynamic responses. Requests under
 * /dashboard, /auth, and /api always go straight to the network, so one user's
 * private data can never be served to another from the cache.
 */
const CACHE = 'mahusay-v7-0-0'
const PRECACHE = ['/offline.html', '/icon.svg']

// Prefixes that must never be cached (authenticated / dynamic).
const NO_CACHE_PREFIXES = ['/dashboard', '/auth', '/api']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // Page navigations: network-first, fall back to the cached offline page.
  // HTML is never cached, so authenticated pages are never persisted.
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match('/offline.html')))
    return
  }

  // Authenticated / dynamic requests: always network, never cached.
  if (NO_CACHE_PREFIXES.some((p) => url.pathname.startsWith(p))) {
    event.respondWith(fetch(request))
    return
  }

  // Static assets: stale-while-revalidate (serve cache, refresh in background).
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const copy = response.clone()
            caches.open(CACHE).then((cache) => cache.put(request, copy))
          }
          return response
        })
        .catch(() => cached)
      return cached || network
    })
  )
})

/* --- Web Push (optional) --------------------------------------------------
 * Handlers are ready; to use them, generate VAPID keys, add a subscribe flow,
 * and send pushes from your backend. See the Next.js PWA guide. */
self.addEventListener('push', (event) => {
  if (!event.data) return
  const data = event.data.json()
  event.waitUntil(
    self.registration.showNotification(data.title || 'mahusay', {
      body: data.body,
      icon: data.icon || '/icon.svg',
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(self.clients.openWindow('/'))
})
