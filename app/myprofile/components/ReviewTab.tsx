// components/ReviewTab.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import { useInView } from 'react-intersection-observer';

import { fetchMyPageReviews, FetchParams } from '@/api/myPage/myPage';
import Card from '@/app/meeting/list/components/Card';
import ChipInfo from '@/components/ui/chip/ChipInfo';
import ReviewHeart from '@/components/ui/review/ReviewHeart';

// 응답 타입 정의
export interface Review {
  reviewId: number;
  reviewContent: string;
  rating: number;
  createdAt: string;
  lighteningId: number;
  title: string;
  city: string;
  town: string;
  lighteningImageUrl: string;
  targetAt: string;
  userId: number;
  nickname: string;
  userImageUrl: string;
}

// 응답 타입 정의
interface ReviewResponse {
  reviews?: Review[];
  totalCount: number;
  [key: string]: any;
}

// 리뷰 데이터를 가져오는 함수를 Promise로 캐싱
let reviewsCache: Promise<ReviewResponse> | null = null;

function getReviewsData(category?: string): Promise<ReviewResponse> {
  if (!reviewsCache) {
    const params: FetchParams = category ? { category } : {};
    reviewsCache = fetchMyPageReviews(params) as Promise<ReviewResponse>;

    // 5분 후 캐시 삭제 (선택적)
    setTimeout(
      () => {
        reviewsCache = null;
      },
      5 * 60 * 1000,
    );
  }

  return reviewsCache;
}

// 리뷰 탭 컴포넌트
export default function ReviewTab() {
  // use 훅으로 리뷰 데이터 로드
  const reviewsData = use(getReviewsData());
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  // 리뷰 데이터 추출 - 필요에 따라 수정
  const reviews: Review[] = reviewsData?.reviews || [];

  // 리뷰 데이터가 비어있는 경우
  if (!reviews || reviews.length === 0) {
    return (
      <div className="col-span-3 flex h-[435px] items-center justify-center whitespace-pre-line bg-white">
        <p className="text-center text-base font-medium text-[#C0C1C2]">
          {`아직 작성한 리뷰가 없어요.\n미팅이 끝난 후 리뷰를 작성해보세요!`}
        </p>
      </div>
    );
  }

  // 데이터가 있는 경우 렌더링
  return (
    <>
      {reviews.map((review, index) => (
        <motion.div
          ref={ref}
          key={review.reviewId}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="overflow-hidden rounded-b-2xl hover:shadow-[0px_10px_10px_1px_rgba(0,0,0,0.1)]"
        >
          <Card mode="list">
            <div className="flex h-[430px] flex-col justify-between overflow-hidden">
              <Link href={`/reviews/${review.lighteningId}`} className="block" prefetch={false}>
                <div className="relative flex h-[200px] w-96 items-center justify-center overflow-hidden">
                  <div className="absolute left-0 top-0 z-0 size-[10px] bg-white" />
                  <div className="absolute bottom-0 right-0 z-0 size-[10px] bg-white" />
                  {review.lighteningImageUrl ? (
                    <Image
                      src={review.lighteningImageUrl}
                      width={384}
                      height={200}
                      alt="thumbnail"
                      className="w-96"
                    />
                  ) : (
                    <Image
                      src="/assets/card/example_image.png"
                      width={384}
                      height={200}
                      alt="thumbnail"
                      className="w-96"
                    />
                  )}
                </div>

                <div className="flex flex-col gap-[10px] p-4">
                  <div className="flex flex-col gap-2">
                    <Card.Title name={review.title} location={`${review.city} ${review.town}`} />
                    <div className="flex h-[22px] flex-row items-center gap-1">
                      <div className="inline-flex items-start justify-start gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <div
                            key={index}
                            style={{ position: 'relative', width: '28px', height: '28px' }}
                          >
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
                    </div>
                  </div>

                  <div className="line-clamp-2 overflow-hidden text-ellipsis font-['Pretendard'] text-base font-medium text-[#8c8c8c]">
                    {review.reviewContent}
                  </div>
                </div>
              </Link>

              <div className="mt-aut flex h-auto w-full items-center justify-end p-4">
                <div className="rounded-lg bg-black px-4 py-2 text-white text-sm">
                  리뷰 상세보기
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </>
  );
}
