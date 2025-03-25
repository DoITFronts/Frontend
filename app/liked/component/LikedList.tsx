"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo, useRef } from "react";

import { MeetingCardLoading } from "@/app/meeting/list/components/skeleton/MeetingCardSkeleton";

import { handleCategoryClick } from "@/components/handler/MeetingHandler";
import CardItem from "@/components/ui/card/CardItem";
import CategoryFilter from "@/components/ui/chip/CategoryFilter";
import EmptyMessage from "@/components/ui/list/EmptyMessage";
import useLikeMeeting from "@/hooks/like/useLikeMeeting";
import {
  defaultFirstOption,
  defaultSecondOption,
} from "@/lib/constants/meeting";
import meetingCategory from "@/lib/constants/meeting/meeting";
import { Meeting } from "@/types/meeting/meeting";
import Filtering from "@/components/ui/list/Filtering";
interface InitialMeetingsProps {
  initialMeetings: Meeting[];
}

export default function LikedList({ initialMeetings }: InitialMeetingsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

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
  // const { openModal } = modalStore();

  // 임시 날짜 상태
  const [tempDate, setTempDate] = useState<Date | null>(selectedDate);

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

  // useInfiniteQuery를 사용해 번개 데이터 가져오기
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLikeMeeting({
    category: selectedCategory,
    city: selectedFirstLocation,
    town: selectedSecondLocation,
    targetAt: selectedDate,
    size: 10,
    initialMeetings,
    order: selectedFilter,
  });

  // 번개 데이터 통합
  const meetings = useMemo(
    () =>
      data?.pages.flatMap((page) =>
        page?.lighteningResponses ? page.lighteningResponses : page,
      ) || [],
    [data?.pages],
  );

  // IntersectionObserver를 이용한 무한 스크롤 구현
  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { rootMargin: "150px", threshold: 0.3 },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

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

      {/* 번개 리스트 */}
      <div>
        {isLoading && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <MeetingCardLoading key={index} />
            ))}
          </div>
        )}
        {!isLoading && !isError && meetings.length === 0 && (
          <EmptyMessage
            firstLine="아직 번개가 없어요"
            secondLine="지금 번개를 만들어 보세요!"
          />
        )}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {meetings.map((meeting: Meeting, index) => (
              <CardItem
                key={`${meeting.id}-${index}`}
                meeting={meeting}
                onClick={() => null}
                priority={index < 10}
              />
            ))}
          </div>
        )}
      </div>

      {/* 무한 스크롤 트리거 */}
      <div ref={observerRef} className="h-10" />
      {isFetchingNextPage && (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <MeetingCardLoading key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
