import Link from 'next/link'

const Navigation = () => {
  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between px-8 py-6 backdrop-blur-sm">
      <div className="text-xl font-bold tracking-tighter text-black dark:text-white">
        <Link href="/">WD.</Link>
      </div>
      <div className="flex items-center gap-8">
        <div className="hidden space-x-8 text-sm font-medium text-zinc-600 dark:text-zinc-400 md:flex">
          <Link href="#about" className="transition-colors hover:text-black dark:hover:text-white">About</Link>
          <Link href="#work" className="transition-colors hover:text-black dark:hover:text-white">Work</Link>
          <Link href="#contact" className="transition-colors hover:text-black dark:hover:text-white">Contact</Link>
        </div>
        <a
          href="/WenceslausDsilva-CV-2026.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-transform hover:scale-105 dark:bg-white dark:text-black"
        >
          Download CV
        </a>
      </div>
    </nav>
  )
}

export default Navigation