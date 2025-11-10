/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // ⚡ Image optimization disable for static export
  images: {
    unoptimized: true,
  },

  // ✅ Modern JS only (no legacy browser polyfills)
  experimental: {
    legacyBrowsers: false,
  },

  // ✅ Minify code using SWC compiler (better than Terser)
  swcMinify: true,

  // ✅ Prefetch critical assets automatically
  optimizeFonts: true,

  // ✅ Add compression for faster delivery
  compress: true,

  // ✅ Enable React strict mode for clean builds
  reactStrictMode: true,

  // ✅ Add HTTP headers (performance + caching)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
