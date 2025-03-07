import { motion } from 'framer-motion'; // framer-motion 임포트

import HeartIcon from '@/components/shared/Icons/HeartIcon';

import { ReviewListProps } from './ReviewList';

export default function ReviewStatus({ reviews }: { reviews: ReviewListProps[] }) {
  // 점수별 개수 집계
  const scoreCounts = Array(5).fill(0);
  let totalScore = 0;
  let totalReviews = 0;

  reviews.forEach((review) => {
    const score = review.review.count; // 점수
    if (score >= 1 && score <= 5) {
      scoreCounts[score - 1] += 1; // 해당 점수 개수 추가
      totalScore += score;
      totalReviews += 1;
    }
  });

  const average = totalReviews > 0 ? (totalScore / totalReviews).toFixed(1) : '0';
  const fullHearts = Math.floor(Number(average));
  const inactiveHearts = 5 - fullHearts;

  const totalPossibleReviews = reviews.length;

  return (
    <div className="flex w-[70%] flex-col items-center justify-between gap-4 sm:flex-row">
      <div className="flex flex-col items-center">
        <div className="flex flex-row">
          <p className="font-['Pretendard'] text-xl font-semibold leading-tight text-[#595959]">
            {average}
          </p>
          <p className="font-['Pretendard'] text-xl font-medium leading-tight text-[#d9d9d9]">/5</p>
        </div>
        <div className="flex">
          {[...Array(fullHearts)].map((_, index) => (
            <HeartIcon key={`full-${index}`} />
          ))}
          {[...Array(inactiveHearts)].map((_, index) => (
            <HeartIcon key={`inactive-${index}`} variant="inactive" />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex flex-col gap-2">
          {scoreCounts.map((count, index) => {
            const percentage = (count / totalPossibleReviews) * 100;

            // 애니메이션을 framer-motion을 사용하여 추가
            return (
              <div key={index} className="flex items-center gap-2 font-pretandard">
                <span className="min-w-6 items-start text-sm text-[#595959]">{index + 1}점</span>
                <div className="relative h-2 min-w-64 rounded-full bg-[#E5E7EB]">
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full bg-[#111827]"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }} // 비율에 맞게 width 애니메이션
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </div>
                <span className="text-sm text-[#595959]">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
