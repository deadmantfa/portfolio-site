interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
  isStreaming: boolean
}

const ChatMessage = ({ role, content, isStreaming }: ChatMessageProps) => {
  const isAssistant = role === 'assistant'

  return (
    <div className={`flex w-full ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div
        data-testid="chat-bubble"
        className={
          isAssistant
            ? 'glass rounded-2xl rounded-tl-sm px-4 py-3 text-sm font-sans text-foreground/80 max-w-[85%]'
            : 'bg-primary/20 border border-primary/30 rounded-2xl rounded-tr-sm px-4 py-3 text-sm font-sans text-foreground ml-auto max-w-[85%]'
        }
      >
        <p className="leading-relaxed whitespace-pre-wrap">{content}</p>
        {isStreaming && (
          <span
            data-testid="streaming-cursor"
            className="inline-block size-2 rounded-full bg-primary/60 ml-1 animate-pulse"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  )
}

export { ChatMessage }
