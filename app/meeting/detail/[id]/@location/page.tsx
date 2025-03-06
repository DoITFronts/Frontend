'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { LocationSkeleton } from '@/app/meeting/detail/components/skeleton/LocationSkeleton';
import useKakaoPlaceInfo from '@/hooks/useKakaoPlaceInfo';
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
  const placeInfo = useKakaoPlaceInfo(meeting?.address ?? null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (!placeInfo || !mapContainer.current || isMapLoaded) return;

    console.log('🗺️ 지도 렌더링 시작');

    window.kakao.maps.load(() => {
      const mapOptions = {
        center: new window.kakao.maps.LatLng(placeInfo.latitude, placeInfo.longitude),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer.current, mapOptions);

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(placeInfo.latitude, placeInfo.longitude),
      });
      marker.setMap(map);

      setIsMapLoaded(true);
    });
  }, [placeInfo, isMapLoaded]);

  if (isLoading) return <LocationSkeleton />;
  if (error || !meeting) return null;
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
                {placeInfo?.roadAddress || meeting.address}
              </div>
              <div className="font-['Pretendard'] text-base font-semibold leading-snug text-[#bfbfbf]">
                {placeInfo?.categoryGroupName || '기타'}
              </div>
            </div>
            <div className="inline-flex h-16 flex-col items-start justify-start gap-2">
              <div className="inline-flex items-start justify-start gap-2">
                <div className="flex w-14 items-center justify-center gap-2.5 overflow-hidden rounded bg-neutral-100 px-2.5 py-1">
                  <div className="flex items-center justify-start gap-1">
                    <div className="font-['Pretendard'] text-xs font-medium leading-tight text-[#595959]">
                      도로명
                    </div>
                  </div>
                </div>
                <div className="font-['Pretendard'] text-base font-medium leading-snug text-neutral-800">
                  서울 중구 을지로 106 203-117호
                </div>
              </div>
              <div className="inline-flex items-start justify-start gap-2">
                <div className="flex w-14 items-center justify-center gap-2.5 overflow-hidden rounded bg-neutral-100 px-2.5 py-1">
                  <div className="flex items-center justify-start gap-1">
                    <div className="font-['Pretendard'] text-xs font-medium leading-tight text-[#595959]">
                      지번
                    </div>
                  </div>
                </div>
                <div className="font-['Pretendard'] text-base font-medium leading-snug text-neutral-800">
                  서울 중구 을지로3가 347-3
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
