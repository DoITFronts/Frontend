import type { Metadata } from 'next';
import '@/styles/global.css';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';

import RootLayout from '@/components/layout/RootLayout';

export const metadata: Metadata = {
  title: '번개팅',
  description: '번개팅은 모임을 위한 서비스입니다.',
  keywords: '모임, 번개팅, 소셜, 네트워킹',
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
      <body>
        <link rel="preconnect" href="/" />
        <RootLayout>{children}</RootLayout>
        <ToastContainer limit={1} />
      </body>
    </html>
  );
}
