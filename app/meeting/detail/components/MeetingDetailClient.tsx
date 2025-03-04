'use client';

import MeetingDetailBody from '@/app/meeting/detail/components/info/MeetingDetailBody';
import MeetingDetailFooter from '@/app/meeting/detail/components/info/MeetingDetailFooter';
import MeetingDetailHeader from '@/app/meeting/detail/components/info/MeetingDetailHeader';
import {
  MeetingDetailError,
  MeetingDetailSkeleton,
} from '@/app/meeting/detail/components/skeleton/MeetingDetailSkeleton';
import Card from '@/app/meeting/list/components/Card';
import FallbackImage from '@/components/shared/FallbackImage';
import { useMeetingDetail } from '@/hooks/useMeetingDetail';
import { MeetingDetail } from '@/types/meeting';

export default function MeetingDetailClient({ meeting }: { meeting: MeetingDetail }) {
  const { data, error } = useMeetingDetail(meeting);

  if (error) return <MeetingDetailError onRetry={() => window.location.reload()} />;
  if (!data?.id) return <MeetingDetailSkeleton />;

  return (
    <Card mode="detail">
      <div className="mt-14 flex h-[271px] gap-6">
        <div className="relative flex w-[518px] items-center justify-center overflow-hidden">
          <FallbackImage />
          <Card.Like meetingId={data?.id} isLiked={data?.isLiked} onClick={() => null} />
        </div>
        <div className="flex h-[271px] w-[calc(100%-518px)] flex-col justify-between">
          <MeetingDetailHeader
            title={data?.title}
            location={`${data?.location.city} ${data?.location.town}`}
            datetime={data?.datetime}
          />
          <MeetingDetailBody summary={data?.summary} />
          <MeetingDetailFooter participantCount={data?.participants?.length ?? 0} capacity={20} />
        </div>
      </div>
    </Card>
  );
}
