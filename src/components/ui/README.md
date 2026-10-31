# UI Primitives

## Overview
Reusable foundational presentation components (Button, Input, Textarea) adhering to the design system, styled via Tailwind CSS and `class-variance-authority`, supporting forward-ref DOM bindings and polymorphic slot rendering.

## Interface
- [Button.tsx:Button]: React forward-ref button component supporting variant styles, sizing, and polymorphic composition.
- [Button.tsx:ButtonProps]: Interface extending `React.ButtonHTMLAttributes<HTMLButtonElement>` and `VariantProps<typeof buttonVariants>` with optional `asChild?: boolean`.
- [Button.tsx:buttonVariants]: Class-variance-authority variant function mapping variants (`default`, `destructive`, `outline`, `secondary`, `ghost`, `link`) and sizes (`default`, `sm`, `lg`, `icon`) to Tailwind CSS classes.
- [Input.tsx:Input]: React forward-ref single-line text input component with standard design-system focus and disabled states.
- [Input.tsx:InputProps]: Interface extending `React.InputHTMLAttributes<HTMLInputElement>`.
- [Textarea.tsx:Textarea]: React forward-ref multiline text area input component with standard ring offset, border, and placeholder styling.
- [Textarea.tsx:TextareaProps]: Interface extending `React.TextareaHTMLAttributes<HTMLTextAreaElement>`.

## Invariants
- [Button.tsx:asChild]: When `asChild` is true, renders via Radix UI `Slot`, requiring exactly one valid child React element. When false or omitted, renders an HTML `<button>` element.
- [Button.tsx:Button]: Forwards React ref directly to the rendered `HTMLButtonElement` or slotted element.
- [Button.tsx:buttonVariants]: Disabled states always apply `disabled:pointer-events-none disabled:opacity-50`.
- [Input.tsx:Input]: Forwards React ref directly to the rendered `HTMLInputElement`.
- [Input.tsx:Input]: Disabled states always apply `disabled:cursor-not-allowed disabled:opacity-50`.
- [Textarea.tsx:Textarea]: Forwards React ref directly to the rendered `HTMLTextAreaElement`.
- [Textarea.tsx:Textarea]: Enforces minimum height of `min-h-[80px]` and `disabled:cursor-not-allowed disabled:opacity-50` when disabled.

## Side Effects
- [Button.tsx:Button]: None (pure presentational component forwarding standard DOM click/focus events).
- [Input.tsx:Input]: None (pure presentational component forwarding standard DOM change/input events).
- [Textarea.tsx:Textarea]: None (pure presentational component forwarding standard DOM change/input events).

## Verification
- Run: `npm test`
