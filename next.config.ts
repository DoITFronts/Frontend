import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const withBundle = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = withBundle({
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
});

export default nextConfig;
