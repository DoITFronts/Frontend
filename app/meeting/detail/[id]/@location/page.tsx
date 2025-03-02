'use client';

import { useEffect, useRef } from 'react';

import { useMeetingDetail } from '@/hooks/useMeetingDetail';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function MeetingLocation() {
  const { data: meeting, isLoading, error } = useMeetingDetail();
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!meeting || !mapContainer.current) return;

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_API_KEY}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapOptions = {
          center: new window.kakao.maps.LatLng(
            meeting?.location.latitude,
            meeting.location.longitude,
          ),
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainer.current, mapOptions);

        const markerPosition = new window.kakao.maps.LatLng(
          meeting.location.latitude,
          meeting.location.longitude,
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: new window.kakao.maps.MarkerImage(
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
            new window.kakao.maps.Size(40, 40),
            { offset: new window.kakao.maps.Point(20, 40) },
          ),
        });
        marker.setMap(map);

        const infowindowContent = `
          <div style="padding:10px; font-size:14px;">
            <strong>${meeting.location.address}</strong><br>
            위도: ${meeting.location.latitude}, 경도: ${meeting.location.longitude}<br>
            <a href="https://map.kakao.com/link/to/${meeting.location.address},${meeting.location.latitude},${meeting.location.longitude}" target="_blank">
              길찾기 (카카오맵)
            </a>
          </div>`;
        const infowindow = new window.kakao.maps.InfoWindow({
          content: infowindowContent,
        });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          infowindow.open(map, marker);
        });

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(meeting.location.address, (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            map.setCenter(coords);
          }
        });

        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
      });
    };

    document.head.appendChild(script);
  }, [meeting]);

  if (isLoading) return <p>로딩 중...</p>;
  if (error || !meeting) return <p>데이터를 불러오지 못했습니다.</p>;

  return (
    <div className="font-['Pretendard'] text-base font-medium leading-normal text-neutral-800">
      <div className="my-8 h-px border-b border-gray-300 opacity-50" />

      <div className="mb-7 inline-flex size-full flex-col items-start justify-start gap-6">
        <div className="self-stretch font-['DungGeunMo'] text-2xl font-normal text-black">
          번개 위치
        </div>
        <div className="inline-flex h-[373px] w-full flex-col items-start justify-start gap-[19px]">
          <div className="inline-flex items-start justify-start">
            <div data-svg-wrapper="" className="relative">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.2427 15.3429L13.0605 18.5563C12.9213 18.6969 12.7561 18.8085 12.5742 18.8847C12.3923 18.9608 12.1973 19 12.0004 19C11.8035 19 11.6085 18.9608 11.4266 18.8847C11.2447 18.8085 11.0794 18.6969 10.9403 18.5563L7.75725 15.3429C6.91817 14.4955 6.34675 13.4159 6.11527 12.2407C5.88378 11.0654 6.00262 9.84718 6.45675 8.74011C6.91089 7.63303 7.67992 6.6868 8.66661 6.02106C9.6533 5.35533 10.8133 5 12 5C13.1867 5 14.3467 5.35533 15.3334 6.02106C16.3201 6.6868 17.0891 7.63303 17.5432 8.74011C17.9974 9.84718 18.1162 11.0654 17.8847 12.2407C17.6532 13.4159 17.0818 14.4955 16.2427 15.3429Z"
                  fill="#595959"
                />
              </svg>
            </div>
            <div className="font-['Pretendard'] text-base font-semibold leading-snug text-[#595959]">
              {meeting.location.address}
            </div>
          </div>
          <div ref={mapContainer} className="h-[330px] self-stretch bg-[#d9d9d9]" />
        </div>
      </div>

      <div className="my-8 h-px border-b border-gray-300 opacity-50" />
    </div>
  );
}
