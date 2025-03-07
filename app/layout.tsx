import type { Metadata } from 'next';

import '@/styles/global.css';
import RootLayout from '@/components/layout/RootLayout';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: '번개팅',
  description: '같이 달랩은 모임을 위한 서비스입니다.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>번개팅</title>
      </head>
      <body>
        <link rel="preconnect" href="/" />
        <RootLayout>{children}</RootLayout>
        <ToastContainer />
      </body>
    </html>
  );
}
