# lib

## Overview
Shared utility functions for class name composition and styling across UI components in the application.

## Interface
- `[src/lib/utils.ts:cn]`: Merges conditional class names using `clsx` and resolves Tailwind CSS conflicts with `twMerge` (`cn(...inputs: ClassValue[]): string`).

## Invariants
- `[src/lib/utils.ts:cn]`: Accepts heterogeneous `ClassValue` arguments (strings, arrays, objects, booleans, null, undefined) without throwing runtime exceptions.
- `[src/lib/utils.ts:cn]`: Resolves Tailwind class conflicts preserving rightmost precedence via `twMerge`.
- `[src/lib/utils.ts:cn]`: Function remains strictly pure and deterministic without mutating argument structures.

## Side Effects
- `[src/lib/utils.ts:cn]`: None. Operates as an in-memory pure calculation with zero I/O or state modification.

## Verification
- Run: `npm test`
