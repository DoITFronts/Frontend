import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

const withBundle = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withPwa = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = withPwa(
  withBundle({
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
  }),
);

export default nextConfig;
