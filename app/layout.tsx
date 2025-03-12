import type { Metadata } from 'next';
import '@/styles/global.css';
import { ToastContainer } from 'react-toastify';

import RootLayout from '@/components/layout/RootLayout';

export const metadata: Metadata = {
  title: '번개팅',
  description: '번개팅은 모임을 위한 서비스입니다.',
  keywords: '모임, 번개팅, 소셜, 네트워킹, 번개',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <title>번개팅</title>
      </head>
      <body>
        <link rel="preconnect" href="/" />
        <RootLayout>{children}</RootLayout>
        <ToastContainer limit={1} />
      </body>
    </html>
  );
}
