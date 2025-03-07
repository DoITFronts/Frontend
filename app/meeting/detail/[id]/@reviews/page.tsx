'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

import {
  ReviewListError,
  ReviewListSkeleton,
} from '@/app/meeting/detail/components/skeleton/ReviewSkeleton';
import Pagination from '@/components/ui/Pagination';
import ReviewItem from '@/components/ui/review/ReviewItem';
import { ReviewList } from '@/types/review';

const reviewVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export default function MeetingReviews() {
  const params = useParams();
  const meetingId = params.id as string;

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const {
    data: meeting,
    isLoading,
    error,
    refetch,
  } = useQuery<ReviewList>({
    queryKey: ['event', meetingId],
    queryFn: () => fetchDetailReview(meetingId),
    enabled: !!meetingId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  if (!meetingId) return <p>⚠️ 이벤트 ID가 필요합니다.</p>;
  if (isLoading) return <ReviewListSkeleton />;
  if (error || !meeting) return null;
  if (!meeting?.length)
    return (
      <div className="mb-16 inline-flex h-[500px] w-full items-center justify-center gap-2.5">
        <div className="text-center font-['Pretendard'] text-base font-medium leading-snug text-[#c0c1c2]">
          아직 리뷰가 없어요
        </div>
      </div>
    );

  const totalReviews = meeting.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const selectedReviews = meeting.slice(startIndex, startIndex + reviewsPerPage);

  return (
    <div className="mb-24 flex-col">
      <div className="font-['DungGeunMo'] text-2xl font-normal text-black">이전 번개 리뷰</div>
      <div className="mt-4 space-y-4">
        {selectedReviews.map((review, index) => (
          <motion.div
            key={review.id}
            variants={reviewVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <ReviewItem
              date={review.date}
              content={review.content}
              count={review.count}
              username={review.writer}
            />
            {index < selectedReviews.length - 1 && (
              <div className="mt-2" data-svg-wrapper="">
                <svg
                  width="1200"
                  height="4"
                  viewBox="0 0 1200 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 2H1200"
                    stroke="#F0F0F0"
                    strokeWidth="3"
                    strokeLinecap="square"
                    strokeDasharray="3 6"
                  />
                </svg>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChangeAction={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
