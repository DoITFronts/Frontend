import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface PlaceInfo {
  latitude: number;
  longitude: number;
  categoryGroupName: string | null;
  roadAddress: string | null;
}

const useKakaoPlaceInfo = (query: string | null): PlaceInfo | null => {
  const [place, setPlace] = useState<PlaceInfo | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const checkKakaoServices = () => {
    let attempts = 0;
    const maxAttempts = 10;

    const interval = setInterval(() => {
      if (window.kakao?.maps?.services) {
        console.log('✅ window.kakao.maps.services 로드 완료');
        setIsScriptLoaded(true);
        clearInterval(interval);
      } else {
        attempts += 1;
        console.warn(`⏳ window.kakao.maps.services 아직 로드되지 않음, ${attempts}번째 시도...`);
        if (attempts >= maxAttempts) {
          console.error('❌ window.kakao.maps.services 로드 실패');
          clearInterval(interval);
        }
      }
    }, 500);
  };

  useEffect(() => {
    console.log('🟡 스크립트 로드 확인 시작');

    if (typeof window !== 'undefined' && window.kakao && window.kakao.maps) {
      console.log('✅ 카카오 API 이미 로드됨');
      setIsScriptLoaded(true);
      return;
    }

    if (document.getElementById('kakao-map-script')) {
      console.log('⚠️ 카카오 API 스크립트가 이미 추가됨');
      return;
    }

    console.log('🚀 카카오 API 스크립트 추가 중...');

    const script = document.createElement('script');
    script.id = 'kakao-map-script';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_API_KEY}&libraries=services,places&autoload=false`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('✅ 카카오 지도 API 스크립트 로드 완료, window.kakao 확인 중...');
      window.kakao.maps.load(() => {
        console.log('✅ window.kakao.maps.load() 실행 완료');
        checkKakaoServices();
      });
    };

    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!isScriptLoaded || !query) return;

    if (!window.kakao?.maps?.services) {
      console.warn('⚠️ window.kakao.maps.services가 아직 로드되지 않음, 500ms 후 재시도...');
      setTimeout(() => checkKakaoServices(), 500);
      return;
    }

    console.log('🔍 장소 검색 실행:', query);
    window.kakao.maps.load(() => {
      const placesService = new window.kakao.maps.services.Places();
      placesService.keywordSearch(query, (data: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
          console.log('✅ 장소 검색 성공:', data[0]);

          const {
            y,
            x,
            category_group_name: categoryGroupName,
            road_address_name: roadAddress,
          } = data[0];

          setPlace({
            latitude: Number(y),
            longitude: Number(x),
            categoryGroupName: categoryGroupName || '기타',
            roadAddress: roadAddress || query,
          });
        } else {
          console.error('❌ 장소 검색 실패:', status);
        }
      });
    });
  }, [query, isScriptLoaded]);

  return place;
};

export default useKakaoPlaceInfo;
