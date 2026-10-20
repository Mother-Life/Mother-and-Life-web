import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Mother & Life, la maternité positive'

/** Image de partage (réseaux sociaux, WhatsApp) aux couleurs de la surface Nuit. */
export default async function ImagePartage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const fr = lang !== 'en'
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        background: '#06202b',
        color: '#fffcf7',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 30, color: '#d6cbba' }}>
        <svg width="28" height="28" viewBox="0 0 14 14">
          <path fill="#ff0099" d="M0 8.28C0 2.56 5.35-.76 13.86.15 14.8 8.58 11.02 14 5.35 14 2.2 14 0 11.89 0 8.28" />
        </svg>
        Mother &amp; Life · Douala
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1 }}>
          {fr ? 'Un cocon de bienveillance' : 'A cocoon of kindness'}
        </div>
        <div style={{ fontSize: 34, color: '#68dcac' }}>{fr ? 'La maternité positive' : 'Positive motherhood'}</div>
      </div>
    </div>,
    size,
  )
}
