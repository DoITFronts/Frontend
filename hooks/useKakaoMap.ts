import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const useKakaoMap = (latitude: string, longitude: string, placeName?: string) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapInstance = useRef<any>(null);
  const markerInstance = useRef<any>(null);

  const createMap = (lat: number, lng: number) => {
    if (!mapContainer.current || !window.kakao?.maps?.LatLng) return;

    const mapOptions = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapContainer.current, mapOptions);
    mapInstance.current = map;

    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(lat, lng),
      map,
    });
    markerInstance.current = marker;

    const infoWindow = new window.kakao.maps.InfoWindow({
      content: `<div style="padding:5px;font-size:14px;">📍 ${placeName || '장소'}</div>`,
    });

    window.kakao.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(map, marker);
      setTimeout(() => {
        window.open(`https://map.kakao.com/link/map/${placeName},${lat},${lng}`, '_blank');
      }, 500);
    });
    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
    map.setZoomable(true);
    map.setDraggable(true);

    setIsMapLoaded(true);
  };

  useEffect(() => {
    const initMap = () => {
      if (!latitude || !longitude) return;

      const parsedLatitude = parseFloat(latitude);
      const parsedLongitude = parseFloat(longitude);

      if (Number.isNaN(parsedLatitude) || Number.isNaN(parsedLongitude)) return;
      if (!mapContainer.current) return;

      createMap(parsedLatitude, parsedLongitude);
    };

    const waitForKakaoSDK = () => {
      if (window.kakao?.maps?.LatLng) {
        initMap();
      } else {
        setTimeout(waitForKakaoSDK, 100);
      }
    };

    waitForKakaoSDK();
  }, [latitude, longitude, placeName]);

  return { mapContainer, isMapLoaded, mapInstance, markerInstance };
};

export default useKakaoMap;
