import { ImageResponse } from 'next/og'
import { brandTokens } from '@/styles/tokens'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Mother & Life'

export function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }]
}

/**
 * Image de partage generee aux dimensions attendues par les reseaux sociaux.
 * Les visuels de `public/assets` sont au format portrait et se recadrent mal.
 */
export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const isFr = lang !== 'en'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: brandTokens.nuit,
          color: '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 999,
              background: brandTokens.rose,
            }}
          />
          <div style={{ fontSize: 28, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.75 }}>
            Mother &amp; Life
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 68, lineHeight: 1.1, maxWidth: 900 }}>
            {isFr
              ? 'Saisir la grossesse comme une chance'
              : 'Embrace pregnancy as an opportunity'}
          </div>
          <div style={{ fontSize: 30, opacity: 0.8, maxWidth: 860 }}>
            {isFr
              ? 'Suivi gratuit de la conception aux 1000 premiers jours \u00b7 Douala, Cameroun'
              : 'Free support from conception through the first 1,000 days \u00b7 Douala, Cameroon'}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {[brandTokens.bleu, brandTokens.rose, brandTokens.vert].map((color) => (
            <div key={color} style={{ width: 160, height: 8, borderRadius: 999, background: color }} />
          ))}
        </div>
      </div>
    ),
    size,
  )
}
