# Hooks

## Overview
The `src/hooks` package provides custom React hooks for UI interactions and browser enhancements across the portfolio application. Currently, it encapsulates dynamic favicon progress rendering driven by page scroll state.

## Interface
- [`useFaviconProgress.ts:useFaviconProgress`]: React hook that subscribes to scroll progress via `useScroll()` and dynamically updates the document favicon.
- [`useFaviconProgress.ts:drawFavicon`]: Utility function that renders the progress indicator arc and glow onto a 64x64 HTML canvas element.
- [`useFaviconProgress.ts:lerpRgb`]: Helper function that linearly interpolates between two RGB color tuples based on a progress factor `t`.

## Invariants
- [`useFaviconProgress.ts:typeof window === 'undefined'`]: Safe in SSR; skips DOM interactions when running outside a browser environment.
- [`useFaviconProgress.ts:prefers-reduced-motion`]: Respects accessibility preferences; aborts favicon animation when `(prefers-reduced-motion: reduce)` matches.
- [`useFaviconProgress.ts:progress > 0.001`]: Arc rendering and glow are only drawn when `progress` is greater than 0.001, and interpolation is clamped to `Math.min(progress, 1)`.
- [`useFaviconProgress.ts:size = 64`]: Favicon canvas dimensions are fixed at 64x64 pixels with center at (32, 32) and background radius of 28.

## Side Effects
- [`useFaviconProgress.ts:document.querySelectorAll`]: Removes existing `<link rel="icon">` elements from `document.head`.
- [`useFaviconProgress.ts:document.createElement`]: Creates and appends a `<link rel="icon" type="image/png" sizes="64x64" data-favicon-animator="true">` element to `document.head` and cleans it up on hook unmount.
- [`useFaviconProgress.ts:(window as any).__faviconCanvas`]: Mutates the global `window` object by storing `__faviconCanvas` and `__faviconLink` references.
- [`useFaviconProgress.ts:canvas.toDataURL`]: Converts canvas drawing to data URL and updates `link.href` on every scroll progress change.
- [`useFaviconProgress.ts:console.log`]: Logs progress and color debug messages to the browser console during canvas drawing.

## Verification
- Run: `npm test`
