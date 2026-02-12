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
    <div className="flex gap-6 mt-16">
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
          className="group flex flex-col items-center gap-3"
          aria-label={social.name}
        >
          <div className="size-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
            <social.icon size={18} className="text-zinc-500 group-hover:text-primary transition-colors" />
          </div>
          <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-600 group-hover:text-zinc-400 transition-colors">
            {social.name}
          </span>
        </motion.a>
      ))}
    </div>
  )
}

export default SocialLinks
