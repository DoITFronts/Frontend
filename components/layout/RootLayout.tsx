'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

import startMockWorker from '@/api/mocks/setup';
import Gnb from '@/components/layout/Gnb';
import ErrorBoundary from '@/components/shared/query/ErrorBoundary';
import Modal from '@/components/ui/modal/Modal';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const pathname = usePathname();

  const queryClient = useMemo(() => new QueryClient(), []);

  useEffect(() => {
    const initMockWorker = async () => {
      try {
        if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_USE_MSW === 'true') {
          console.log('✅ MSW 실행됨');
          await startMockWorker();
        } else {
          console.log('⚠️ MSW 실행되지 않음 (NEXT_PUBLIC_USE_MSW=false)');
        }
        setReady(true);
      } catch (err) {
        console.error('MSW 실행 중 오류 발생:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    };

    initMockWorker();
  }, []);

  if (error) {
    return <ErrorBoundary error={error} />;
  }

  if (!ready) {
    return <div className="flex h-screen items-center justify-center">⏳ 데이터 로딩 중...</div>;
  }

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
        {isMeetingDetail && (
          <BottomFloatingBar key={pathname} title="번개팅" subtitle="지금 당장 신청해보라능" />
        )}
        <Modal />
      </div>
    </QueryClientProvider>
  );
}
