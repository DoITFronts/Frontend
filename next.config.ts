import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: process.env.NEXT_PUBLIC_API_BASE_URL?.split(',') || [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'codeit-doit.s3.ap-northeast-2.amazonaws.com',
      },
    ],
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
};

export default nextConfig;
