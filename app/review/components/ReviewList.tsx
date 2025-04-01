"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import CategoryFilter from "@/components/ui/chip/CategoryFilter";
import EmptyMessage from "@/components/ui/list/EmptyMessage";
import useReview from "@/hooks/review/useReview";
import {
  defaultFirstOption,
  defaultSecondOption,
} from "@/lib/constants/meeting";
import meetingCategory from "@/lib/constants/meeting/meeting";
import modalStore from "@/store/modalStore";
import { regions } from "@/types/map/regions";
import { Reviews } from "@/types/review/review";

import ReviewItem from "./ReviewItem";
import ReviewStatus from "./ReviewStatus";
import ReviewSkeleton from "./skeleton/ReviewSkeleton";
import { handleCategoryClick } from "@/components/handler/MeetingHandler";
import Filtering from "@/components/ui/list/Filtering";

interface InitialReviewsProps {
  initialReviews: {
    reviews: Reviews[];
    totalCount: number;
  };
}

export default function ReviewList({ initialReviews }: InitialReviewsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { reviews } = initialReviews;

  // URL에서 가져온 검색 조건을 상태로 관리
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "전체",
  );
  const [selectedFirstLocation, setSelectedFirstLocation] = useState(
    searchParams.get("location_1") || defaultFirstOption,
  );
  const [selectedSecondLocation, setSelectedSecondLocation] = useState(
    searchParams.get("location_2") || defaultSecondOption,
  );
  const [selectedDate, setSelectedDate] = useState(
    searchParams.get("targetAt")
      ? new Date(searchParams.get("targetAt") as string)
      : null,
  );
  const [selectedFilter, setSelectedFilter] = useState(
    searchParams.get("order") || "",
  );
  const observerRef = useRef<HTMLDivElement | null>(null);

  const meetingLocationFirst = useMemo(
    () => [defaultFirstOption, ...Object.keys(regions)],
    [],
  );
  const meetingLocationSecond = useMemo(
    () => [defaultSecondOption, ...(regions[selectedFirstLocation] || [])],
    [selectedFirstLocation],
  );

  // 임시 날짜 상태
  const [tempDate, setTempDate] = useState<Date | null>(selectedDate);

  // useInfiniteQuery를 사용해 모든 리뷰 데이터 가져오기
  const { isLoading, isError, isFetchingNextPage } = useReview({
    category: selectedCategory,
    city: selectedFirstLocation,
    town: selectedSecondLocation,
    targetAt: selectedDate,
    initialReviews: initialReviews.reviews,
  });

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "전체");
    setSelectedFirstLocation(
      searchParams.get("location_1") || defaultFirstOption,
    );
    setSelectedSecondLocation(
      searchParams.get("location_2") || defaultSecondOption,
    );
    setSelectedFilter(searchParams.get("order") || "");
  }, [searchParams]);

  // URL을 변경하여 상태 업데이트
  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key === "date" ? "targetAt" : key, value);
    } else {
      params.delete(key === "date" ? "targetAt" : key);
    }
    router.replace(`?${decodeURIComponent(params.toString())}`, {
      scroll: false,
    });
  };

  return (
    <div className="container mx-auto mt-6 max-w-[1200px] md:mt-[50px]">
      {/* 번개 카테고리 */}
      <div className="mb-3 flex gap-[10px] md:mb-5 md:gap-3">
        {meetingCategory.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() =>
              handleCategoryClick(
                category,
                setSelectedCategory,
                updateSearchParams,
              )
            }
            className="cursor-pointer font-semibold focus:outline-none"
          >
            <CategoryFilter
              text={category}
              size="lg"
              mode={selectedCategory === category ? "dark" : "light"}
            />
          </button>
        ))}
      </div>

      {/* 리뷰 점수 */}
      <div className="mb-[30px] flex max-w-[1200px] md:mb-6 lg:mb-10">
        <ReviewStatus reviews={reviews} />
      </div>

      {/* 필터링 드롭다운 */}
      <Filtering
        selectedFirstLocation={selectedFirstLocation}
        selectedSecondLocation={selectedSecondLocation}
        selectedDate={selectedDate}
        selectedFilter={selectedFilter}
        setSelectedSecondLocation={setSelectedSecondLocation}
        setSelectedDate={setSelectedDate}
        setTempDate={setTempDate}
        tempDate={tempDate}
        searchParams={searchParams}
        setSelectedFilter={setSelectedFilter}
        router={router}
        updateSearchParams={updateSearchParams}
      />

      {/* 리뷰 리스트 */}
      <div>
        {isLoading && <ReviewSkeleton />}
        {isError && <ReviewSkeleton />}
        {!isLoading && !isError && reviews.length === 0 && (
          <EmptyMessage firstLine="아직 작성한 리뷰가 없어요" />
        )}
        <div className="flex flex-col gap-y-6">
          {reviews.map((review, index) => (
            <ReviewItem
              key={review.reviewId}
              review={review}
              priority={index < 10}
            />
          ))}
        </div>
      </div>

      {/* 무한 스크롤 트리거 */}
      <div ref={observerRef} className="h-10" />
      {isFetchingNextPage && <ReviewSkeleton />}
    </div>
  );
}
