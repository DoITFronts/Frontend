import { motion } from 'framer-motion';

import ReviewHeart from '@/components/ui/review/ReviewHeart';
import { Reviews } from '@/types/review';

export default function ReviewStatus({ reviews }: { reviews: Reviews[] }) {
  // 점수별 개수 집계
  const scoreCounts = Array(5).fill(0);
  let totalScore = 0;
  let totalReviews = 0;

  reviews.forEach((review) => {
    const score = review.rating; // 점수
    if (score >= 1 && score <= 5) {
      scoreCounts[score - 1] += 1; // 해당 점수 개수 추가
      totalScore += score;
      totalReviews += 1;
    }
  });

  const average = totalReviews > 0 ? (totalScore / totalReviews).toFixed(1) : '0';
  const fullHearts = Math.floor(Number(average));
  const halfHeartPercentage = (Number(average) - fullHearts) * 100;

  const totalPossibleReviews = reviews.length;

  return (
    <div className="flex w-[70%] flex-col items-center justify-between gap-4 sm:flex-row">
      <div className="flex flex-col items-center">
        <div className="flex flex-row">
          <p className="relative justify-start font-['Pretendard'] text-[40px] font-bold leading-loose text-black">
            {average}
          </p>
          <p className="relative justify-start font-['Pretendard'] text-[40px] font-semibold leading-loose text-[#bfbfbf]">
            /5
          </p>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <div
              key={`${average}-${index}`}
              style={{ position: 'relative', width: '28px', height: '28px' }}
            >
              <ReviewHeart fillPercentage={0} />
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '28px',
                  height: '28px',
                  overflow: 'hidden',
                  clipPath: `inset(0 ${100 - (index < fullHearts ? 100 : index === fullHearts ? halfHeartPercentage : 0)}% 0 0)`,
                }}
                initial={{ width: 0 }}
                animate={{ width: '28px' }}
                transition={{ duration: 0.5, ease: 'easeInOut', delay: index * 0.2 }}
              >
                <ReviewHeart fillPercentage={100} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex flex-col gap-2">
          {scoreCounts
            .map((count, index) => {
              const percentage =
                totalPossibleReviews > 0 ? (count / totalPossibleReviews) * 100 : 0;

              // 애니메이션을 framer-motion을 사용하여 추가
              return (
                <div key={index} className="flex items-center gap-6 font-pretandard">
                  <span className="font-pretendard relative justify-start text-center text-xs font-medium leading-tight text-neutral-800">
                    {5 - index}점
                  </span>
                  <div className="relative h-1 min-w-64 rounded-full bg-[#E5E7EB]">
                    <motion.div
                      className="absolute left-0 top-0 h-full rounded-full bg-[#111827]"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }} // 비율에 맞게 width 애니메이션
                      transition={{ duration: 1, ease: 'easeInOut' }}
                    />
                  </div>
                  <span className="font-pretendard relative justify-start text-center text-xs font-medium leading-tight text-[#d9d9d9]">
                    {count}
                  </span>
                </div>
              );
            })
            .reverse()}
        </div>
      </div>
    </div>
  );
}
