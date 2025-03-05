'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { useMeetingDetail } from '@/hooks/useMeetingDetail';

declare global {
  interface Window {
    kakao: any;
  }
}

const mapVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

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
          center: new window.kakao.maps.LatLng(meeting.latitude, meeting.longitude),
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainer.current, mapOptions);

        const markerPosition = new window.kakao.maps.LatLng(
          meeting.latitude || 37.5563,
          meeting.longitude || 126.9723,
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
            <strong>${meeting.address}</strong><br>
            위도: ${meeting.latitude}, 경도: ${meeting.longitude}<br>
            <a href="https://map.kakao.com/link/to/${meeting.address},${meeting.latitude},${meeting.longitude}" target="_blank">
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
        geocoder.addressSearch(meeting.address, (result: any, status: any) => {
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
        <motion.div
          className="inline-flex h-[373px] w-full items-start justify-start gap-[19px]"
          variants={mapVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div ref={mapContainer} className="size-full self-stretch bg-[#d9d9d9]" />
          <div className="inline-flex h-full w-2/6 flex-col items-start justify-start gap-[19px]">
            <div className="flex flex-col items-start justify-center gap-1">
              <div className="font-['Pretendard'] text-2xl font-bold text-black">
                {meeting.address}
              </div>
              <div className="font-['Pretendard'] text-base font-semibold leading-snug text-[#bfbfbf]">
                카페,디저트
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <div className="inline-flex items-center justify-start gap-2">
                <div className="flex items-center justify-center gap-2.5 overflow-hidden rounded bg-neutral-100 px-2.5 py-1">
                  <div className="flex items-center justify-start gap-1">
                    <div className="font-['Pretendard'] text-xs font-medium leading-tight text-[#595959]">
                      도로명
                    </div>
                  </div>
                </div>
                <div className="font-['Pretendard'] text-base font-medium leading-snug text-neutral-800">
                  {meeting.address}
                </div>
              </div>
              <div className="inline-flex items-center justify-start gap-2">
                <div className="flex items-center justify-center gap-2.5 overflow-hidden rounded bg-neutral-100 px-2.5 py-1">
                  <div className="flex items-center justify-start gap-1">
                    <div className="font-['Pretendard'] text-xs font-medium leading-tight text-[#595959]">
                      지번
                    </div>
                  </div>
                </div>
                <div className="font-['Pretendard'] text-base font-medium leading-snug text-neutral-800">
                  {meeting.address}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="my-8 h-px border-b border-gray-300 opacity-50" />
    </div>
  );
}
