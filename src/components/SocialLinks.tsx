'use client'

import { Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const SocialLinks = () => {
  const socials = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/wenceslaus-dsilva',
      icon: Linkedin,
      label: 'Professional Network'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/deadmantfa',
      icon: Github,
      label: 'Technical Repository'
    },
    {
      name: 'Email',
      url: 'mailto:wenceslausdsilva@gmail.com',
      icon: Mail,
      label: 'Direct Channel'
    }
  ]

  return (
    <div className="flex gap-6 mt-16 pointer-events-auto">
      {socials.map((social, i) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * i }}
          className="group flex flex-col items-center gap-3 cursor-pointer"
          aria-label={social.name}
        >
          <div className="size-14 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:border-primary group-hover:bg-primary/10 transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <social.icon size={22} className="text-zinc-400 group-hover:text-primary transition-colors" />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
            {social.name}
          </span>
        </motion.a>
      ))}
    </div>
  )
}

export default SocialLinks
