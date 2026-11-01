import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          borderRadius: '36px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '36px',
            border: '2px solid rgba(99, 102, 241, 0.4)',
          }}
        />
        <div
          style={{
            fontSize: 104,
            fontWeight: 900,
            color: '#6366f1',
            fontFamily: 'serif',
            fontStyle: 'italic',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          W
          <span
            style={{
              color: '#ffffff',
              fontSize: 80,
              marginLeft: 2,
            }}
          >
            .
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
