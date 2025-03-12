'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

import Gnb from '@/components/layout/Gnb';
import SplashScreen from '@/components/layout/SplashScreen';
import Modal from '@/components/ui/modal/Modal';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const queryClient = useMemo(() => new QueryClient(), []);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    // 브라우저 환경일 때만 실행
    if (typeof window === 'undefined') return;

    // 이미 로드된 경우 건너뜀
    if (window.kakao?.maps) return;

    // 이미 스크립트 태그가 있는 경우 건너뜀
    if (document.getElementById('kakao-map-script')) return;

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
              className={`flex-1 overflow-auto ${!pathname.includes('/user') && pathname !== '/' ? 'mt-16' : ''}`}
            >
              <React.Suspense
                fallback={<div className="p-4 text-center">⏳ 데이터 불러오는 중...</div>}
              >
                {children}
              </React.Suspense>
            </div>
            <Modal />
          </>
        )}
      </div>
    </QueryClientProvider>
  );
}
