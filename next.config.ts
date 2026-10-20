import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const mediaOrigin = new URL(process.env.NEXT_PUBLIC_MEDIA_ORIGIN ?? 'https://media.motherandlife.org')

/**
 * En-têtes de sécurité communs à toutes les réponses, admin compris.
 * La CSP des pages publiques est posée par le middleware (elle porte un nonce).
 */
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=(), interest-cohort=()',
  },
]

const nextConfig: NextConfig = {
  // Sortie de développement séparée du build de production.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75],
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [48, 96, 160, 320],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: 'https', hostname: mediaOrigin.hostname },
      ...(process.env.NODE_ENV === 'development' ? [{ protocol: 'http' as const, hostname: 'localhost' }] : []),
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default withPayload(nextConfig)
