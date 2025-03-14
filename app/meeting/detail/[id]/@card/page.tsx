'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import MeetingDetailFooter from '@/app/meeting/detail/components/info/MeetingDetailFooter';
import MeetingDetailHeader from '@/app/meeting/detail/components/info/MeetingDetailHeader';
import {
  DetailCardError,
  DetailCardSkeleton,
} from '@/app/meeting/detail/components/skeleton/DetailCardSkeleton';
import Card from '@/components/ui/card/Card';
import Category from '@/components/ui/card/component/Category';
import { useMeetingDetail } from '@/hooks/useMeetingDetail';
import categoryMap from '@/types/categoryMap';
import { Participant } from '@/types/meeting';

export default function DetailCard() {
  const params = useParams();
  const meetingId = params.id as string;

  const { data, isLoading, error, refetch } = useMeetingDetail();
  if (!meetingId || !data?.id || isLoading) return <DetailCardSkeleton />;
  if (error) return <DetailCardError onRetry={() => refetch} />;

  const reverseCategoryMap: Record<string, string> = Object.fromEntries(
    Object.entries(categoryMap).map(([kor, eng]) => [eng, kor]),
  );

  return (
    <Card mode="detail">
      <div className="mt-14 flex w-full gap-6 flex-col md:flex-row lg:min-h-[17rem]">
        <motion.div
          whileHover={{
            scaleX: 1.05,
            scaleY: 1.08,
            translateX: '-2%',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative flex w-full md:w-[24rem] lg:w-[32rem] items-center justify-center overflow-hidden"
        >
          <Card.Like meetingId={data.id} isLiked={data.isLiked} onClick={() => null} />
          <div className="absolute left-0 top-0 z-10 size-[10px] bg-white" />
          <div className="absolute bottom-0 right-0 z-10 size-[10px] bg-white" />
          <Image
            src={data.imageUrl || `/fallback/fallback_image_${data?.category?.toLowerCase()}.png`}
            width={384}
            height={200}
            alt="thumbnail"
            className="w-full h-auto object-cover aspect-[4/3]"
          />
          <Card.Like meetingId={data.id} isLiked={data.isLiked} onClick={() => null} />
          <div className="absolute right-[0.8rem] top-4">
            <Category type={reverseCategoryMap[data.category]} />
          </div>
        </motion.div>
        <div className="flex h-auto w-full flex-col justify-between lg:w-[calc(100%-32rem)]">
          <MeetingDetailHeader
            title={data.title}
            location={`${data.city} ${data.town}`}
            datetime={data.targetAt}
            summary={data.summary}
          />
          <MeetingDetailFooter
            participantCount={data.participantCount}
            capacity={data.capacity}
            participants={data.participants as Participant[]}
          />
        </div>
      </div>
    </Card>
  );
}
