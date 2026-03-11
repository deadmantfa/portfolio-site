'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send } from 'lucide-react'
import type { ChatMessage as ChatMessageType } from '@/app/api/chat/route'
import { ChatMessage } from '@/components/ChatMessage'
import { STARTER_QUESTIONS } from '@/data/chatKnowledgeBase'

const SESSION_KEY = 'ask_wenceslaus_count'
const MAX_MESSAGES = 10

const AskWenceslaus = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const getCount = (): number => {
    if (typeof window === 'undefined') return 0
    const stored = sessionStorage.getItem(SESSION_KEY)
    return stored ? parseInt(stored, 10) : 0
  }

  const incrementCount = () => {
    if (typeof window === 'undefined') return
    sessionStorage.setItem(SESSION_KEY, String(getCount() + 1))
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (messages.length > 0) scrollToBottom()
  }, [messages])

  const handleSend = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isStreaming) return

    const count = getCount()
    if (count >= MAX_MESSAGES) return

    const userMsg: ChatMessageType = { role: 'user', content: trimmed }
    const nextMessages = [...messages, userMsg]

    setMessages(nextMessages)
    setInput('')
    setHasStarted(true)
    setIsStreaming(true)
    incrementCount()

    // Placeholder for streaming response
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const reader = response.body!.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        const final = accumulated
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: final }
          return updated
        })
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'I encountered an issue. Please try again.',
        }
        return updated
      })
    } finally {
      setIsStreaming(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend(input)
  }

  const atLimit = getCount() >= MAX_MESSAGES
  const nearLimit = getCount() >= MAX_MESSAGES - 2

  return (
    <>
      {/* Floating orb button */}
      <motion.button
        aria-label="Ask Wenceslaus"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 glass size-14 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-150 active:scale-[0.97] will-change-transform"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <MessageSquare className="size-5 text-primary" strokeWidth={1.5} />
        <span className="absolute inset-0 rounded-full border border-primary/30 opacity-0 hover:opacity-100 hover:animate-ping transition-opacity" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Neural Interface"
            aria-modal="true"
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 glass rounded-[2rem] flex flex-col overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 90 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-foreground/50">
                Neural Interface
              </p>
              <button
                aria-label="Close"
                onClick={() => setIsOpen(false)}
                className="size-7 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="size-3.5 text-foreground/50" strokeWidth={1.5} />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80 [scrollbar-width:none]">
              {messages.length === 0 && (
                <p className="font-sans text-xs text-foreground/40 text-center py-4">
                  Ask me anything about my work, philosophy, or approach.
                </p>
              )}
              {messages.map((msg, i) => (
                <ChatMessage
                  key={i}
                  role={msg.role}
                  content={msg.content}
                  isStreaming={isStreaming && i === messages.length - 1 && msg.role === 'assistant'}
                />
              ))}
              {nearLimit && !atLimit && (
                <p className="font-mono text-[9px] text-foreground/30 text-center tracking-[0.2em] uppercase">
                  {MAX_MESSAGES - getCount()} messages remaining
                </p>
              )}
              {atLimit && (
                <p className="font-mono text-[9px] text-foreground/40 text-center tracking-[0.2em] uppercase">
                  Session limit reached — refresh to continue
                </p>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Starter chips */}
            <AnimatePresence>
              {!hasStarted && (
                <motion.div
                  className="px-4 pb-3 flex flex-col gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {STARTER_QUESTIONS.map((q, i) => (
                    <motion.button
                      key={q}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.25 }}
                      onClick={() => handleSend(q)}
                      className="glass rounded-full px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground hover:border-primary/30 transition-all text-left active:scale-[0.98]"
                    >
                      {q}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 border-t border-white/10"
            >
              <input
                aria-label="message"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isStreaming || atLimit}
                placeholder={atLimit ? 'Session limit reached' : 'Ask anything...'}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-sans text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-40"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim() || isStreaming || atLimit}
                className="size-10 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center transition-all active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send className="size-4 text-primary" strokeWidth={1.5} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export { AskWenceslaus }
