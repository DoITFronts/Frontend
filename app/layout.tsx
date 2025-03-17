import type { Metadata } from "next";
import "@/styles/global.css";
import Script from "next/script";
import { ToastContainer } from "react-toastify";

import RootLayout from "@/components/layout/RootLayout";

export const metadata: Metadata = {
  title: "번개의 시작, 번개팅",
  description: "번개팅을 통해 다양한 번개 모임을 가져보세요!",
  keywords: "모임, 번개팅, 소셜, 네트워킹, 번개모임, 이벤트",
  applicationName: "번개팅",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    url: "https://doitz.netlify.app",
    title: "번개의 시작, 번개팅",
    description: "번개팅을 통해 다양한 번개 모임을 가져보세요!",
    siteName: "번개팅",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "번개팅 로고",
      },
    ],
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
    shortcut: "/icons/icon-192x192.png",
  },
  other: {
    "og:image": "/icons/icon-512x512.png",
    "og:title": "번개의 시작, 번개팅",
    "og:description": "번개팅을 통해 다양한 번개 모임을 가져보세요!",
    "og:url": "https://doitz.netlify.app",
    "og:type": "website",
    "theme-color": "#000000",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <title>번개팅</title>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className="custom-cursor">
        <link rel="preconnect" href="/" />
        <RootLayout>{children}</RootLayout>
        <ToastContainer
          position="top-center"
          autoClose={900}
          hideProgressBar
          closeButton={false}
          limit={1}
        />
      </body>
    </html>
  );
}
