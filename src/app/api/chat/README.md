# src/app/api/chat

## Overview
The `src/app/api/chat` component package implements the conversational AI backend endpoint (`/api/chat`). It processes multi-turn portfolio inquiries using a grounded knowledge base prompt, enforcing session message limits and multi-provider failover between Anthropic Claude and Google Gemini models.

## Interface
- `[route.ts:ChatMessage]`: Interface defining chat payload messages with `role: 'user' | 'assistant'` and `content: string`.
- `[route.ts:POST]`: Next.js HTTP POST Route Handler processing conversation messages and returning a streamed plain-text `Response` with `X-AI-Provider` metadata header.

## Invariants
- `[route.ts:POST]`: Rejects non-JSON or malformed request bodies with HTTP 400 (`'Invalid JSON'`).
- `[route.ts:POST]`: Requires at least one message in `messages` array, returning HTTP 400 (`'At least one message is required'`).
- `[route.ts:MAX_MESSAGES]`: Rejects requests exceeding 10 messages with HTTP 429 (`'Session rate limit reached'`).
- `[route.ts:POST]`: Executes multi-provider fallback hierarchy: primary Anthropic (`claude-sonnet-4-6`), falling back to Google Gemini (`gemini-3.1-flash-lite-preview`), then Gemini secondary (`gemini-2.5-pro`), returning HTTP 503 if all providers fail.

## Side Effects
- `[route.ts:queryAnthropic]`: Issues outbound HTTPS requests to the Anthropic API using `process.env.ANTHROPIC_API_KEY`.
- `[route.ts:queryGeminiModel]`: Issues outbound HTTPS requests to the Google Gemini API using `process.env.GEMINI_API_KEY`.
- `[route.ts:console.warn]`: Writes fallback diagnostic warnings to server logs on provider error.
- `[route.ts:console.error]`: Writes critical errors to server logs when all AI providers fail.

## Verification
- Run: `npm test`
