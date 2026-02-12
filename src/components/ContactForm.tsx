'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ContactForm = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setFormState('success')
  }

  if (formState === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-12 rounded-[2rem] text-center max-w-lg w-full"
      >
        <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
          <span className="text-primary text-3xl">✓</span>
        </div>
        <h3 className="text-3xl font-serif italic text-white mb-4">Transmission Received.</h3>
        <p className="text-zinc-400 font-sans leading-relaxed">
          The architectural handshake is complete. I will review your message and respond shortly.
        </p>
        <button 
          onClick={() => { setFormState('idle'); setFormData({ name: '', email: '', message: '' }) }}
          className="mt-8 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 hover:text-primary transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card/30 backdrop-blur-lg p-8 md:p-12 rounded-[3rem] w-full max-w-2xl border border-white/10 relative overflow-hidden pointer-events-auto shadow-2xl"
    >
      <div className="absolute inset-0 tech-grid opacity-5 pointer-events-none"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
        <div className="space-y-2">
          <label htmlFor="name" className="block font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500 ml-4">Full Name</label>
          <input
            id="name"
            required
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-primary/50 transition-colors font-sans"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500 ml-4">Email Axis</label>
          <input
            id="email"
            required
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-primary/50 transition-colors font-sans"
          />
        </div>
      </div>

      <div className="space-y-2 mb-10 relative z-10">
        <label htmlFor="message" className="block font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500 ml-4">Structural Details</label>
        <textarea
          id="message"
          required
          rows={5}
          placeholder="Describe the scope of your vision..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-primary/50 transition-colors font-sans resize-none"
        />
      </div>

      <button
        disabled={formState === 'submitting'}
        type="submit"
        className="w-full bg-primary text-black font-mono text-[11px] uppercase tracking-[0.4em] py-5 rounded-full hover:bg-white transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 relative z-10"
      >
        {formState === 'submitting' ? (
          <>
            <div className="size-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
            Transmitting...
          </>
        ) : (
          'Establish Connection'
        )}
      </button>
    </motion.form>
  )
}

export default ContactForm
