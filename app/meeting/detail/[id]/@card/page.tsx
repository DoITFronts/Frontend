'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import MeetingDetailFooter from '@/app/meeting/detail/components/info/MeetingDetailFooter';
import MeetingDetailHeader from '@/app/meeting/detail/components/info/MeetingDetailHeader';
import {
  DetailCardError,
  DetailCardSkeleton,
} from '@/app/meeting/detail/components/skeleton/DetailCardSkeleton';
import Card from '@/components/ui/card/Card';
import NotFoundPage from '@/app/not-found';
import Category from '@/components/ui/chip/Category';
import { useMeetingDetail } from '@/hooks/useMeetingDetail';
import categoryMap from '@/types/categoryMap';
import { Participant } from '@/types/meeting';

export default function DetailCard() {
  const params = useParams();
  const meetingId = params.id as string;

  const { data, isLoading, error, refetch } = useMeetingDetail();
  if (!meetingId || !data?.id) return <NotFoundPage />;
  if (isLoading) return <DetailCardSkeleton />;
  if (error) return <DetailCardError onRetry={() => refetch} />;

  const reverseCategoryMap: Record<string, string> = Object.fromEntries(
    Object.entries(categoryMap).map(([kor, eng]) => [eng, kor]),
  );

  return (
    <Card mode="detail">
      <div className="mt-14 flex h-[271px] gap-6">
        <div className="relative flex w-[518px] items-center justify-center overflow-hidden">
          <Image
            src={data.imageUrl || '/assets/card/example_image.png'}
            width={384}
            height={200}
            alt="thumbnail"
            className="w-full"
          />
          <Card.Like meetingId={data.id} isLiked={data.isLiked} onClick={() => null} />
          <div className="absolute right-[14px] top-[17.5px]">
            <Category type={reverseCategoryMap[data.category]} />
          </div>
        </div>
        <div className="flex h-[271px] w-[calc(100%-518px)] flex-col justify-between">
          <MeetingDetailHeader
            title={data.title}
            location={`${data.city} ${data.town}`}
            datetime={data.targetAt}
            summary={data.summary}
          />
          <MeetingDetailFooter
            participantCount={data.participantCount}
            capacity={data.capacity}
            participantId={data.participants.map((p: Participant) => p.userId)}
          />
        </div>
      </div>
    </Card>
  );
}
