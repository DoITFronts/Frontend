'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

import Gnb from '@/components/layout/Gnb';
import Modal from '@/components/modal/Modal';
import Spinner from '../skeleton/LoadingSpinner';
import SplashScreen from './SplashScreen';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const queryClient = useMemo(() => new QueryClient(), []);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => console.log('[Service Worker] 등록 성공'))
        .catch((error) => console.error('[Service Worker] 등록 실패', error));
    }
    if (window.kakao?.maps || document.getElementById('kakao-map-script')) return;

    const script = document.createElement('script');
    script.id = 'kakao-map-script';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_API_KEY}&libraries=services,places&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load();
      console.log('카카오맵 SDK 로드 완료');
    };

    document.head.appendChild(script);
    if (!sessionStorage.getItem('visited')) {
      setShowSplash(true);
      setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('visited', 'true');
      }, 2500);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen flex-col">
        {showSplash ? (
          <SplashScreen onCompleteAction={() => setShowSplash(false)} />
        ) : (
          <>
            {!pathname.includes('/user') && pathname !== '/' && <Gnb />}
            <div
              className={`flex-1 overflow-auto ${
                !pathname.includes('/user') && pathname !== '/' ? 'mt-16' : ''
              }`}
            >
              <React.Suspense fallback={<Spinner />}>{children}</React.Suspense>
            </div>
            <Modal />
          </>
        )}
      </div>
    </QueryClientProvider>
  );
}