import SceneCanvas from '@/components/SceneCanvas'
import VisionaryScene from '@/components/VisionaryScene'
import Timeline from '@/components/Timeline'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black text-white">
      <SceneCanvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <VisionaryScene />
        <Timeline />
      </SceneCanvas>

      <section className="pointer-events-none fixed inset-0 z-10 flex flex-col items-center justify-center px-8 text-center">
        <h1 className="text-7xl font-bold tracking-tighter md:text-9xl">
          Visionary Architect.
        </h1>
        <p className="mt-6 text-xl text-zinc-400 md:text-2xl">
          20+ years of engineering excellence and strategic leadership.
        </p>
        <div className="mt-10 flex gap-4 pointer-events-auto">
          <button className="rounded-full bg-white px-8 py-4 text-lg font-medium text-black transition-transform hover:scale-105">
            Scroll to Journey
          </button>
        </div>
      </section>
    </main>
  )
}
