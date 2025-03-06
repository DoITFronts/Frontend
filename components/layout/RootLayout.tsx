'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

import Gnb from '@/components/layout/Gnb';
import SplashScreen from '@/components/layout/SplashScreen';
import Modal from '@/components/ui/modal/Modal';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleComplete = useMemo(
    () => () => {
      throw new Error('Function not implemented.');
    },
    [],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
  const pathname = usePathname();
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      {!isLoaded ? (
        <SplashScreen onComplete={handleComplete} />
      ) : (
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
          <Modal />
        </div>
      )}
    </QueryClientProvider>
  );
}
