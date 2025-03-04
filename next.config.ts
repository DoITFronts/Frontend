import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(',') || [],
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
  webpack: (config, { dev }) => {
    if (dev) {
      const originalEntry = config.entry;

      config.entry = async () => {
        const entries = typeof originalEntry === 'function' ? await originalEntry() : originalEntry;

        if (entries['main.js'] && !entries['main.js'].includes('./api/mocks/index.ts')) {
          entries['main.js'].unshift('./api/mocks/index.ts');
        }

        return entries;
      };
    }
    return config;
  },
};

export default nextConfig;
