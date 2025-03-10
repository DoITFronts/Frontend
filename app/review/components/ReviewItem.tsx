import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';

import HostInfo from '@/app/meeting/components/HostInfo';
import Card from '@/app/meeting/list/components/Card';
import HeartIcon from '@/components/shared/Icons/HeartIcon';
import Category from '@/components/ui/chip/Category';
import ChipInfo from '@/components/ui/chip/ChipInfo';
import { Reviews } from '@/types/review';

export default function ReviewItem({ review, priority }: { review: Reviews; priority: boolean }) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <Link
      href={`/meeting/detail/${review.lighteningId}`}
      passHref
      className="inline-flex flex-col items-start justify-start md:flex-row md:gap-x-6"
      prefetch={false}
    >
      {/* 이미지 */}
      <div className="flex w-full max-w-[384px] justify-between overflow-hidden">
        <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden">
          <div className="absolute left-0 top-0 z-0 size-[10px] bg-white" />
          <div className="absolute bottom-0 right-0 z-0 size-[10px] bg-white" />
          <Image
            src={review?.lighteningImageUrl}
            width={384}
            height={200}
            alt="썸네일"
            className="h-full object-cover"
            priority={priority}
          />
          <div className="absolute right-[14px] top-[17.5px]">
            <Category type={!category ? '술' : category} />
          </div>
        </div>
      </div>
      {/* 리뷰 내용 */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="inline-flex h-[200px] shrink grow basis-0 flex-col items-start justify-between py-4 "
      >
        <div className="flex flex-col items-start justify-start gap-2 self-stretch">
          <div className="flex flex-col items-start justify-start gap-2.5 self-stretch">
            <Card.Title name={review.title} location={`${review.city} ${review.town}`} />
            <div className="inline-flex items-start justify-start gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} style={{ position: 'relative', width: '28px', height: '28px' }}>
                  <HeartIcon fillPercentage={0} />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '28px',
                      height: '28px',
                      overflow: 'hidden',
                      clipPath: `inset(0 ${100 - (index < review.rating ? 100 : 0)}% 0 0)`,
                    }}
                  >
                    <HeartIcon fillPercentage={100} />
                  </div>
                </div>
              ))}
            </div>
            <div className="line-clamp-2 overflow-hidden text-ellipsis font-pretandard text-base font-medium text-[#8c8c8c]">
              {review.reviewContent}
            </div>
          </div>
          <div className="inline-flex items-center justify-start gap-3">
            <div className="flex items-center justify-start gap-3">
              <div className="flex items-center justify-start gap-2">
                <HostInfo name={review.nickname} />
              </div>
              <div className="font-['Pretendard'] text-xs font-medium leading-none text-gray-500">
                <ChipInfo datetime={review.createdAt} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
