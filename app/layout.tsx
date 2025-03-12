import type { Metadata } from 'next';

import '@/styles/global.css';
import RootLayout from '@/components/layout/RootLayout';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: '번개팅',
<<<<<<< HEAD
  description: '같이 달랩은 모임을 위한 서비스입니다.',
=======
  description: '번개팅은 모임을 위한 서비스입니다.',
  keywords: '모임, 번개팅, 소셜, 네트워킹, 번개',
>>>>>>> 36f88de4d6e5298c28f2e804bb6e01aa2b885d21
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
        <ToastContainer limit={1} />
      </body>
    </html>
  );
}
