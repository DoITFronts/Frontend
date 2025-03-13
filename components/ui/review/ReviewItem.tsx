import ProfileIcon from '@/components/utils/BaseProfile';
import ReviewHeart from '@/components/ui/review/ReviewHeart';
import { formatDate } from '@/utils/formatDateTime';

interface ReviewItemProps {
  count: number;
  content: string;
  username: string;
  date: string;
}

export default function ReviewItem({ count, content, username, date }: ReviewItemProps) {
  return (
    <div className="inline-flex flex-col items-start justify-start gap-4">
      <div className="flex h-20 flex-col items-start justify-start gap-2 self-stretch">
        <div className="flex h-[52px] flex-col items-start justify-start gap-1 self-stretch">
          {[...Array(5)].map((_, index) => (
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
                  clipPath: `inset(0 ${100 - (index < count ? 100 : 0)}% 0 0)`,
                }}
              >
                <ReviewHeart fillPercentage={100} />
              </div>
            </div>
          ))}
          <div className="self-stretch font-['Pretendard'] text-sm font-normal leading-tight text-neutral-800">
            {content}
          </div>
        </div>
        <div className="inline-flex h-5 items-center justify-start gap-1.5">
          <div className="flex items-center justify-start gap-1.5">
            <ProfileIcon size="small" />
            <div className="font-['Pretendard'] text-xs font-semibold leading-none text-[#bfbfbf]">
              {username}
            </div>
          </div>
          <div className="size-[3px] rounded-full bg-[#bfbfbf]" />
          <div className="font-['Pretendard'] text-xs font-medium leading-none text-[#bfbfbf]">
            {formatDate(date)}
          </div>
        </div>
      </div>
    </div>
  );
}
