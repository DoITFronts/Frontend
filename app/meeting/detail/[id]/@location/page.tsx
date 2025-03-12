'use client';

import { motion } from 'framer-motion';

import { LocationSkeleton } from '@/app/meeting/detail/components/skeleton/LocationSkeleton';
import useKakaoMap from '@/hooks/useKakaoMap';
import useKakaoPlaceInfo from '@/hooks/useKakaoPlaceInfo';
import { useMeetingDetail } from '@/hooks/useMeetingDetail';

declare global {
  interface Window {
    kakao: any;
  }
}

const DEFAULT_LOCATION = {
  latitude: '37.5665',
  longitude: '126.978',
};

const mapVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function MeetingLocation() {
  const { data: meeting, isLoading, error } = useMeetingDetail();
  const latitude = meeting?.latitude ?? DEFAULT_LOCATION.latitude;
  const longitude = meeting?.longitude ?? DEFAULT_LOCATION.longitude;
  const placeName = meeting?.placeName;
  const { mapContainer } = useKakaoMap(latitude, longitude, placeName);
  const placeInfo = useKakaoPlaceInfo(latitude, longitude, placeName);

  if (isLoading) return <LocationSkeleton />;
  if (error || !meeting) return null;

  return (
    <div className="font-['Pretendard'] text-base font-medium leading-normal text-neutral-800">
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
              <div className="font-['Pretendard'] text-2xl font-bold text-black">{placeName}</div>
              <div className="font-['Pretendard'] text-base font-semibold leading-snug text-[#bfbfbf]">
                {placeInfo?.categoryGroupName || '기타'}
              </div>
            </div>
            <div className="inline-flex h-16 flex-col items-start justify-start gap-2">
              <div className="inline-flex items-start justify-start gap-2">
                <div className="flex min-w-14 items-center justify-center gap-2.5 overflow-hidden rounded bg-neutral-100 px-2.5 py-1">
                  <div className="font-['Pretendard'] text-xs font-medium leading-tight text-[#595959]">
                    도로명
                  </div>
                </div>
                <div className="font-['Pretendard'] text-base font-medium leading-snug text-neutral-800">
                  {placeInfo?.roadAddress || '정보 없음'}
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
