'use client';

import { motion } from 'framer-motion';

import { LocationSkeleton } from '@/app/meeting/detail/components/skeleton/LocationSkeleton';
import useKakaoMap from '@/hooks/map/useKakaoMap';
import useKakaoPlaceInfo from '@/hooks/map/useKakaoPlaceInfo';
import { useMeetingDetail } from '@/hooks/meeting/useMeetingDetail';

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
          className="flex w-full flex-col items-start justify-start gap-5 md:flex-row"
          variants={mapVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div
            ref={mapContainer}
            className="h-auto min-h-[250px] w-full bg-[#d9d9d9] md:h-[373px] md:w-3/5"
          />
          <div className="flex w-full flex-col items-start justify-start gap-4 md:w-2/5">
            <div className="flex flex-col items-start justify-center gap-1">
              <div className="text-xl font-bold text-black md:text-2xl">{placeName}</div>
              <div className="text-sm font-semibold text-[#bfbfbf] md:text-base">
                {placeInfo?.categoryGroupName || '기타'}
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full flex-col gap-2 md:flex-row">
                <div className="flex min-w-14 items-center justify-center rounded bg-neutral-100 px-2.5 py-1">
                  <div className="text-xs font-medium text-[#595959]">도로명</div>
                </div>
                <div className="text-base font-medium text-neutral-800">
                  {placeInfo?.roadAddress || '정보 없음'}
                </div>
              </div>
              <div className="flex w-full flex-col gap-2 md:flex-row">
                <div className="flex min-w-14 items-center justify-center rounded bg-neutral-100 px-2.5 py-1">
                  <div className="text-xs font-medium text-[#595959]">지번</div>
                </div>
                <div className="text-base font-medium text-neutral-800">{meeting.address}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="my-8 h-px border-b border-gray-300 opacity-50" />
    </div>
  );
}
