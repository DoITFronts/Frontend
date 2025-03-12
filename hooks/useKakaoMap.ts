import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const useKakaoMap = (latitude: string, longitude: string, placeName?: string) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const createMap = (lat: number, lng: number) => {
    if (!mapContainer.current) {
      console.error('createMap 실행 중에도 mapContainer가 없음!');
      return;
    }

    const mapOptions = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapContainer.current, mapOptions);
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(lat, lng),
      map,
    });
    const infoWindow = new window.kakao.maps.InfoWindow({
      content: `<div style="padding:5px;font-size:14px;">📍 ${placeName || '장소'}</div>`,
    });
    window.kakao.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(map, marker);
      setTimeout(() => {
        window.open(`https://map.kakao.com/link/map/${placeName},${lat},${lng}`, '_blank');
      }, 500);
    });

    setIsMapLoaded(true);
  };

  useEffect(() => {
    console.log('📌 useEffect 실행됨', {
      latitude,
      longitude,
      isMapLoaded,
      hasContainer: !!mapContainer.current,
    });

    if (!latitude || !longitude) {
      console.error('❌ 위도/경도가 유효하지 않음:', { latitude, longitude });
      return;
    }

    const parsedLatitude = parseFloat(latitude);
    const parsedLongitude = parseFloat(longitude);

    if (Number.isNaN(parsedLatitude) || Number.isNaN(parsedLongitude)) {
      console.error('❌ 위도/경도 변환 실패:', latitude, longitude);
      return;
    }

    if (!mapContainer.current) {
      console.warn('⏳ mapContainer가 아직 마운트되지 않음. 다음 렌더링에서 재시도...');
      return;
    }

    createMap(parsedLatitude, parsedLongitude);
  }, [latitude, longitude, mapContainer.current]);

  return { mapContainer, isMapLoaded };
};

export default useKakaoMap;
