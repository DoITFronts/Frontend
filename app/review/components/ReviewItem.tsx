import Image from 'next/image';

import HostInfo from '@/app/meeting/components/HostInfo';
import HeartIcon from '@/components/shared/Icons/HeartIcon';
import Category from '@/components/ui/chip/Category';
import ChipInfo from '@/components/ui/chip/ChipInfo';
import categoryMap from '@/types/categoryMap';

import { ReviewListProps } from './ReviewList';

const reverseCategoryMap: Record<string, string> = Object.fromEntries(
  Object.entries(categoryMap).map(([kor, eng]) => [eng, kor]),
);

export default function ReviewItem({ reviews }: { reviews: ReviewListProps }) {
  return (
    <div className="inline-flex flex-col items-start justify-start gap-6 md:flex-row">
      {/* 이미지 */}
      <div className="flex items-center justify-end overflow-hidden">
        <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden">
          <div className="absolute left-0 top-0 z-0 size-[10px] bg-white" />
          <div className="absolute bottom-0 right-0 z-0 size-[10px] bg-white" />
          <Image src={reviews.imageUrl} width={280} height={200} alt="썸네일" className="w-full" />
          <div className="absolute right-[14px] top-[17.5px]">
            {/* <Category type={reverseCategoryMap[reviews.category]} /> */}
            <Category type={reviews.category} />
          </div>
        </div>
      </div>
      {/* 리뷰 내용 */}
      <div className="inline-flex shrink grow basis-0 flex-col items-start justify-between">
        <div className="flex flex-col items-start justify-start gap-2 self-stretch">
          <div className="flex flex-col items-start justify-start gap-2.5 self-stretch">
            <div className="inline-flex items-start justify-start gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <HeartIcon
                  key={index}
                  variant={index < reviews.review.count ? 'active' : 'inactive'}
                />
              ))}
            </div>
            <div className="line-clamp-2 overflow-hidden text-ellipsis font-pretandard text-base font-medium text-[#8c8c8c]">
              {reviews.review.content}
            </div>
            <div className="relative justify-center font-['Pretendard'] text-base font-semibold leading-snug text-[#bfbfbf]">
              {reviews.city} {reviews.town}
            </div>
          </div>
          <div className="inline-flex items-center justify-start gap-3">
            <div className="flex items-center justify-start gap-3">
              <div className="flex items-center justify-start gap-2">
                <HostInfo name={reviews.review.writer} />
              </div>
              <div className="font-['Pretendard'] text-xs font-medium leading-none text-gray-500">
                <ChipInfo datetime={reviews.review.date} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
