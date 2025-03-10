'use client';

import Image from 'next/image';

import {
  HostInfoSkeleton,
  HostInfoError,
} from '@/app/meeting/detail/components/skeleton/HostInfoSkeleton';
import ProfileIcon from '@/components/shared/BaseProfile';
import { useMeetingDetail } from '@/hooks/useMeetingDetail';

export default function MeetingHostInfo() {
  const { data: meeting, isLoading, error, refetch } = useMeetingDetail();

  if (isLoading) return <HostInfoSkeleton />;
  if (error || !meeting) return <HostInfoError onRetry={() => refetch()} />;

  return (
    <div className="font-['Pretendard'] text-base font-medium leading-normal text-neutral-800">
      <div className="my-8 h-px border-b border-gray-300 opacity-50" />

      <div className="mb-7 inline-flex size-full flex-col items-start justify-start gap-6">
        <div className="self-stretch font-['DungGeunMo'] text-2xl font-normal text-black">
          번개 주최자 정보
        </div>
        <div className="inline-flex items-start justify-start gap-3.5 self-stretch">
          <div className="relative size-[42px] overflow-hidden rounded-full">
            {meeting.host?.profileImage ? (
              <Image
                src={meeting.host.profileImage}
                alt={`${meeting.host.name} 프로필`}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            ) : (
              <ProfileIcon id={meeting.host?.id} size={42} />
            )}
          </div>
          <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0.5">
            <div className="inline-flex items-center justify-start gap-2">
              <div className="font-['Pretendard'] text-xl font-bold text-black">
                {meeting.host?.name || '알 수 없는 사용자'}
              </div>
              <div className="font-['Pretendard'] text-base font-medium text-[#bfbfbf]">
                {meeting.host?.email || 'unknown@example.com'}
              </div>
            </div>
            <div className="font-['Pretendard'] text-base font-medium leading-normal text-neutral-800">
              {meeting.host?.userBio || '사용자 정보가 없습니다.'}
            </div>
          </div>
        </div>
      </div>

      <div className="my-8 h-px border-b border-gray-300 opacity-50" />
    </div>
  );
}
