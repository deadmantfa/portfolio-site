'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sendEmail } from '@/app/actions/contact'

const ContactForm = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    setErrorMessage('')
    
    const result = await sendEmail(formData)
    
    if (result.success) {
      setFormState('success')
    } else {
      setFormState('error')
      setErrorMessage(result.error || 'Something went wrong.')
    }
  }

  if (formState === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-10 rounded-[2rem] text-center max-w-lg w-full"
        role="status"
        aria-live="polite"
      >
        <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
          <span className="text-primary text-3xl">✓</span>
        </div>
        <h3 className="text-3xl font-serif italic text-foreground mb-4">Transmission Received.</h3>
        <p className="text-foreground/60 font-sans leading-relaxed">
          The architectural handshake is complete. I will review your message and respond shortly.
        </p>
        <button 
          onClick={() => { setFormState('idle'); setFormData({ name: '', email: '', message: '' }) }}
          className="mt-8 text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/40 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded px-2"
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
      className="bg-card/30 backdrop-blur-lg p-6 md:p-10 rounded-[2.5rem] w-full max-w-2xl border border-white/10 relative overflow-hidden pointer-events-auto shadow-2xl"
    >
      <div className="absolute inset-0 tech-grid opacity-5 pointer-events-none"></div>
      
      {formState === 'error' && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-mono text-center">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
        <div className="space-y-1.5">
          <label htmlFor="name" className="block font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40 ml-4">Full Name</label>
          <input
            id="name"
            required
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors font-sans"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="block font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40 ml-4">Email Axis</label>
          <input
            id="email"
            required
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors font-sans"
          />
        </div>
      </div>

      <div className="space-y-1.5 mb-8 relative z-10">
        <label htmlFor="message" className="block font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40 ml-4">Structural Details</label>
        <textarea
          id="message"
          required
          rows={3}
          placeholder="Describe the scope of your vision..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-4 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors font-sans resize-none"
        />
      </div>

      <button
        disabled={formState === 'submitting'}
        type="submit"
        className="w-full bg-primary text-black font-mono text-[11px] uppercase tracking-[0.4em] py-4 rounded-full hover:bg-foreground hover:text-background transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 relative z-10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
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
