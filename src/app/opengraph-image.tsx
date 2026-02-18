import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Wenceslaus Dsilva | Architectural Leadership'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.1) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              backgroundColor: '#6366f1',
              borderRadius: '50%',
              marginRight: 20,
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
            }}
          />
          <div
            style={{
              fontSize: 60,
              color: 'white',
              fontWeight: 900,
              letterSpacing: '-0.05em',
              fontFamily: 'serif',
              fontStyle: 'italic',
            }}
          >
            Wenceslaus Dsilva
          </div>
        </div>
        
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 30,
              color: '#a1a1aa',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: 'monospace',
              marginBottom: 10,
            }}
          >
            Chief Technology Officer
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#71717a',
              fontFamily: 'sans-serif',
            }}
          >
            Architectural Leadership & Technical Strategy
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
