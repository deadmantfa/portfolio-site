import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const size = {
  width: 64,
  height: 64,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          fontWeight: 'bold',
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6366f1',
          fontFamily: 'serif',
        }}
      >
        W
      </div>
    ),
    { ...size }
  )
}
