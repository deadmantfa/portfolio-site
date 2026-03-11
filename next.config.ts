import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  reactCompiler: true,
  productionBrowserSourceMaps: true,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Tightened CSP: removed 'unsafe-eval' and cdn.jsdelivr.net (unused);
          // added object-src 'none' and base-uri 'self' to close injection vectors.
          // 'unsafe-inline' remains in script-src — required by Next.js inline
          // hydration scripts. Full nonce-based CSP is tracked as a follow-up.
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://cal.com https://app.cal.com",
              // worker-src must explicitly allow blob: — troika-three-text (3D text rendering)
              // creates workers from blob URLs. Without this, worker-src falls back to
              // script-src which lacks blob:, blocking the font worker and breaking BlueprintSchema.
              "worker-src blob:",
              "style-src 'self' 'unsafe-inline' https://cal.com https://app.cal.com",
              "img-src 'self' data: https:",
              "font-src 'self' data: https://cal.com https://app.cal.com",
              "connect-src 'self' https:",
              "frame-src https://cal.com https://app.cal.com",
              "object-src 'none'",
              "base-uri 'self'",
              "frame-ancestors 'none'",
            ].join('; '),
          },
          // Monitor Trusted Types violations without enforcement.
          // Upgrade to enforcement once all DOM-sink usages are audited.
          {
            key: 'Content-Security-Policy-Report-Only',
            value: "require-trusted-types-for 'script'",
          },
          // HSTS: 2-year max-age, includeSubDomains, preload-list ready.
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // COOP: isolates browsing context from cross-origin windows.
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=(), payment=()',
          },
        ],
      },
    ]
  },
};

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withAnalyzer(nextConfig);
