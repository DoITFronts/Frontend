const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPWA = require('next-pwa');

module.exports = withBundleAnalyzer(
  withPWA({
    reactStrictMode: true,
    images: {
      domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(',') || [],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'codeit-doit.s3.ap-northeast-2.amazonaws.com',
        },
      ],
      minimumCacheTTL: 86400,
    },
    headers: async () => [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ],
    webpack(config, { isServer }) {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
        };
      }
      return config;
    },
  })
);
