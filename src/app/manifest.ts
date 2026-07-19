import type { MetadataRoute } from 'next'

/**
 * Web App Manifest (Next.js 16 metadata route).
 * Served at /manifest.webmanifest and auto-linked into every page's <head>.
 * Makes the app installable to a device home screen.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'mahusay — Next.js 16 Scaffold',
    short_name: 'mahusay',
    description:
      'A progressive Next.js 16 + Supabase auth scaffold, installable as a Progressive Web App.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
    ],
  }
}
