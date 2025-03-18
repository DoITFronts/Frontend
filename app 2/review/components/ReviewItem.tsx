import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

import Card from '@/components/ui/card/Card';
import Category from '@/components/ui/card/component/Category';
import HostInfo from '@/components/ui/card/component/HostInfo';
import ChipDate from '@/components/ui/chip/ChipDate';
import ReviewHeart from '@/components/ui/review/ReviewHeart';
import categoryMap from '@/types/categoryMap';
import { Reviews } from '@/types/review';

export default function ReviewItem({ review, priority }: { review: Reviews; priority: boolean }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const reverseCategoryMap: Record<string, string> = Object.fromEntries(
    Object.entries(categoryMap).map(([kor, eng]) => [eng, kor]),
  );

  return (
    <Link
      href={`/meeting/detail/${review.lighteningId}`}
      passHref
      className="inline-flex flex-col items-start justify-start overflow-hidden md:flex-row md:gap-x-6"
      prefetch={false}
    >
      <motion.div
        className="flex w-full min-w-[330px] justify-between overflow-hidden md:w-[384px] lg:max-w-[384px]"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden">
          <div className="absolute left-0 top-0 z-0 size-[10px] bg-white" />
          <div className="absolute bottom-0 right-0 z-0 size-[10px] bg-white" />
          <Image
            src={review?.lighteningImageUrl}
            width={384}
            height={200}
            alt="썸네일"
            className="w-full object-cover"
            priority={priority}
          />
          <div className="absolute right-[14px] top-[17.5px]">
            <Category type={reverseCategoryMap[review.category]} />
          </div>
        </div>
      </motion.div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="inline-flex w-full flex-col py-4 sm:px-4 md:px-0"
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Card.Title name={review.title} location={`${review.city} ${review.town}`} />
            <div className="inline-flex items-start justify-start gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} style={{ position: 'relative', width: '28px', height: '28px' }}>
                  <ReviewHeart fillPercentage={0} />
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
                    <ReviewHeart fillPercentage={100} />
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
                <ChipDate datetime={review.createdAt} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
