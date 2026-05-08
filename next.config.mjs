/** @type {import('next').NextConfig} */
const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [{ source: '/', destination: '/index.html' }];
  },
  async headers() {
    return [
      // Allow Live Server (5501), file://, and other local origins to call the API in development
      ...(isDevelopment ? [{
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      }] : []),
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline' https://js.stripe.com${isDevelopment ? " 'unsafe-eval'" : ''}`,
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://api.stripe.com https://api.frankfurter.dev https://r.stripe.com https://m.stripe.network",
              "media-src 'self'",
              "frame-src https://js.stripe.com https://hooks.stripe.com https://m.stripe.network",
              "worker-src 'self' blob:",
              "frame-ancestors 'none'"
            ].join('; ')
          }
        ]
      }
    ];
  }
};

export default nextConfig;
