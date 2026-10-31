# src/app/actions

## Overview
The `src/app/actions` component package encapsulates server-side mutation actions executed via Next.js Server Actions. It processes user interactions such as contact form submissions with sanitization, input validation, and external email delivery.

## Interface
- `[contact.ts:sendEmail]`: Async Next.js Server Action (`'use server'`) accepting `{ name: string, email: string, message: string }` and returning Promise of `{ error: string } | { success: true }`.

## Invariants
- `[contact.ts:sendEmail]`: Rejects submissions with `{ error: 'All fields are required.' }` if `name`, `email`, or `message` are falsy or empty.
- `[contact.ts:sendEmail]`: Enforces email pattern validation using `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, returning `{ error: 'Invalid email address.' }` on validation failure.
- `[contact.ts:escapeHtml]`: Sanitizes `&`, `<`, `>`, `"`, and `'` characters in `name` and `message` prior to generating HTML email templates.

## Side Effects
- `[contact.ts:resend.emails.send]`: Makes an outbound HTTPS request to the Resend API using `process.env.RESEND_API_KEY` to deliver contact notifications to `wenceslausdsilva@gmail.com`.
- `[contact.ts:console.error]`: Writes operational errors to server-side stderr on delivery or runtime failures.

## Verification
- Run: `npm test`
