import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import HostInfo from '@/app/meeting/components/HostInfo';
import Card from '@/app/meeting/list/components/Card';
import HeartIcon from '@/components/shared/Icons/HeartIcon';
import Category from '@/components/ui/chip/Category';
import ChipInfo from '@/components/ui/chip/ChipInfo';
import { Reviews } from '@/types/review';

export default function ReviewItem({ review }: { review: Reviews }) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  return (
    <div className="inline-flex flex-col items-start justify-start gap-6 md:flex-row">
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
          />
          <div className="absolute right-[14px] top-[17.5px]">
            <Category type={!category ? '술' : category} />
          </div>
        </div>
      </div>
      {/* 리뷰 내용 */}
      <div className="inline-flex shrink grow basis-0 flex-col items-start justify-between">
        <div className="flex flex-col items-start justify-start gap-2 self-stretch">
          <div className="flex flex-col items-start justify-start gap-2.5 self-stretch">
            <Card.Title name={review.title} location={`${review.city} ${review.town}`} />
            <div className="inline-flex items-start justify-start gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <HeartIcon key={index} variant={index < review.rating ? 'active' : 'inactive'} />
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
      </div>
    </div>
  );
}
