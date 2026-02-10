import SceneCanvas from '@/components/SceneCanvas'
import VisionaryScene from '@/components/VisionaryScene'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <SceneCanvas>
        <VisionaryScene />
      </SceneCanvas>

      <section className="container relative z-10 mx-auto px-8">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-bold tracking-tighter text-black dark:text-white md:text-8xl">
            Visionary Architect.
          </h1>
          <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400 md:text-2xl">
            20+ years of engineering excellence and strategic leadership.
          </p>
          <div className="mt-10 flex gap-4">
            <button className="rounded-full bg-black px-8 py-4 text-lg font-medium text-white transition-transform hover:scale-105 dark:bg-white dark:text-black">
              View Journey
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
