import withBundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import withPWA from "next-pwa";
import path from "path";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const withBundle = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withPWAWrapper = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
}) as (config: NextConfig) => NextConfig;

const TerserPlugin = require("terser-webpack-plugin");

const nextConfig: NextConfig = withBundle(
  withPWAWrapper({
    reactStrictMode: true,
    images: {
      domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(",") || [],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "codeit-doit.s3.ap-northeast-2.amazonaws.com",
        },
      ],
      minimumCacheTTL: 86400,
    },
    headers: async () => [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ],
    webpack: (config, { isServer }) => {
      // Output 설정 추가
      config.output = {
        ...config.output,
        filename: "static/chunks/[name].[contenthash].js",
        chunkFilename: "static/chunks/[name].[contenthash].js",
      };

      // Alias 설정
      config.resolve.alias = {
        ...config.resolve.alias,
        "@components": path.resolve(__dirname, "src/components"),
        "@utils": path.resolve(__dirname, "src/utils"),
      };

      // Tree Shaking 활성화
      config.optimization = {
        ...config.optimization,
        usedExports: true,
      };

      // 번들 분석 도구 추가
      if (process.env.ANALYZE === "true") {
        config.plugins.push(new BundleAnalyzerPlugin());
      }

      // Terser로 JS 압축 & console.log 삭제
      if (!isServer) {
        if (!config.optimization.minimizer) {
          config.optimization.minimizer = [];
        }
        config.optimization.minimizer.push(
          new TerserPlugin({
            parallel: true, // 병렬 실행
            terserOptions: {
              compress: {
                drop_console: true, // console.log 삭제
              },
            },
          })
        );
      }

      return config;
    };
  }) as NextConfig,
);

export default withSentryConfig(nextConfig, {
  org: "xeun-lab",
  project: "thunderting",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true,
});
