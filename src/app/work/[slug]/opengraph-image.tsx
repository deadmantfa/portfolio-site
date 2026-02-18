import { ImageResponse } from 'next/og'
import { projects } from '@/data/projects'

export const runtime = 'edge'

export const alt = 'Project Case Study'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000000',
            color: 'white',
            fontSize: 48,
          }}
        >
          Project Not Found
        </div>
      ),
      { ...size }
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#000000',
          backgroundImage: 'linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          padding: 80,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
          }}
        />
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ color: '#6366f1', fontSize: 24, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            Case Study
          </div>
          <div style={{ width: 40, height: 1, backgroundColor: '#333', margin: '0 20px' }} />
          <div style={{ color: '#71717a', fontSize: 24, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            {project.company}
          </div>
        </div>

        <div
          style={{
            fontSize: 80,
            color: 'white',
            fontFamily: 'serif',
            fontStyle: 'italic',
            lineHeight: 1,
            marginBottom: 40,
            maxWidth: '90%',
          }}
        >
          {project.title}
        </div>

        <div style={{ display: 'flex', gap: 20, marginTop: 'auto' }}>
          {project.highlights.slice(0, 3).map((h, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(255,255,255,0.05)', padding: '20px 30px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ color: 'white', fontSize: 32, fontFamily: 'serif', fontStyle: 'italic', marginBottom: 5 }}>{h.value}</div>
              <div style={{ color: '#a1a1aa', fontSize: 14, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
