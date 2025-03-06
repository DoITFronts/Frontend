'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import { ToastContainer } from 'react-toastify';

import Gnb from '@/components/layout/Gnb';
import Modal from '@/components/ui/modal/Modal';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen flex-col">
        {!pathname.includes('/user') && pathname !== '/' && <Gnb />}
        <div
          className={`flex-1 overflow-auto ${!pathname.includes('/user') && pathname !== '/' ? 'mt-16' : ''}`}
        >
          <React.Suspense
            fallback={<div className="p-4 text-center">⏳ 데이터 불러오는 중...</div>}
          >
            {children}
          </React.Suspense>
        </div>
        <ToastContainer />
        <Modal />
      </div>
    </QueryClientProvider>
  );
}
