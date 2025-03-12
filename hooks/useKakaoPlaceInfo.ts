import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface PlaceInfo {
  latitude: number | undefined;
  longitude: number | undefined;
  categoryGroupName: string | null;
  roadAddress: string | null;
}

const loadKakaoAPI = (): Promise<void> =>
  new Promise((resolve, reject) => {
    if (window.kakao?.maps) {
      console.log('✅ 카카오 맵 SDK 이미 로드됨');
      resolve();
      return;
    }

    if (document.getElementById('kakao-map-script')) {
      console.log('⏳ 기존 스크립트 로드 대기 중...');
      return;
    }

    const script = document.createElement('script');
    script.id = 'kakao-map-script';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_API_KEY}&libraries=services,places&autoload=false`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log('✅ 카카오 맵 SDK 최종 로드 완료');
      window.kakao.maps.load(() => {
        resolve();
      });
    };

    script.onerror = () => {
      console.error('❌ 카카오 맵 SDK 로드 실패');
      reject(new Error('카카오 맵 SDK 로드 실패'));
    };

    document.head.appendChild(script);
  });

const useKakaoPlaceInfo = (
  latitude: string,
  longitude: string,
  placeName?: string,
): PlaceInfo | null => {
  const [place, setPlace] = useState<PlaceInfo | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initializeKakaoAPI = async () => {
      try {
        await loadKakaoAPI();
        setIsScriptLoaded(true);
        console.log('🚀 카카오 API 로드 성공! 데이터 요청 시작.');
      } catch (error) {
        console.error('🚨 카카오 API 로드 중 오류 발생:', error);
      }
    };

    initializeKakaoAPI();
  }, []);

  useEffect(() => {
    console.log('📌 useEffect 실행됨', { latitude, longitude, isScriptLoaded, placeName });

    if (!isScriptLoaded) {
      console.warn('⏳ 스크립트가 아직 로드되지 않음.');
      return;
    }

    if (!latitude || !longitude) {
      console.error('❌ 위도/경도가 정상적으로 들어오지 않음', { latitude, longitude });
      return;
    }

    const parsedLatitude = parseFloat(latitude);
    const parsedLongitude = parseFloat(longitude);

    if (Number.isNaN(parsedLatitude) || Number.isNaN(parsedLongitude)) {
      console.error('❌ 위도/경도 변환 실패:', latitude, longitude);
      return;
    }

    console.log('📌 위치 검색 시작:', { parsedLatitude, parsedLongitude });

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(parsedLongitude, parsedLatitude, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
        console.log('🟢 coord2Address 결과 확인', result);

        const { address, road_address: roadAddress } = result[0];
        const formattedAddress =
          roadAddress?.address_name || address?.address_name || '주소 정보 없음';

        setPlace((prev) => ({
          ...(prev ?? {
            latitude: parsedLatitude,
            longitude: parsedLongitude,
            categoryGroupName: null,
            roadAddress: formattedAddress,
          }),
        }));

        console.log('✅ 도로명 주소 가져오기 성공:', formattedAddress);

        const places = new window.kakao.maps.services.Places();

        // 🔥 placeName이 있으면 우선적으로 검색
        const searchKeyword = placeName || formattedAddress;

        places.keywordSearch(
          searchKeyword,
          (categoryResults: any, categoryStatus: any) => {
            let category = '기타';

            if (
              categoryStatus === window.kakao.maps.services.Status.OK &&
              categoryResults.length > 0
            ) {
              category =
                categoryResults[0].category_group_name ||
                categoryResults[0].category_name ||
                '기타';
            }

            setPlace((prev) => ({
              ...(prev ?? {
                latitude: parsedLatitude,
                longitude: parsedLongitude,
                roadAddress: formattedAddress,
              }),
              categoryGroupName: category,
            }));

            console.log('✅ 카테고리 정보 가져오기 성공:', category);
          },
          {
            location: new window.kakao.maps.LatLng(parsedLatitude, parsedLongitude),
            radius: 500, // 🔹 검색 범위 조정 (기존 1000m → 500m)
          },
        );
      } else {
        console.error('❌ 위치 정보 검색 실패:', status);
      }
    });
  }, [latitude, longitude, isScriptLoaded, placeName]);

  return place;
};

export default useKakaoPlaceInfo;
