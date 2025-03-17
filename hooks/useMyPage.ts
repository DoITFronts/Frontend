import {
  fetchMyPageMeetings,
  FetchMyPageMeetingsParams,
  fetchMyPageReviews,
  FetchParams,
} from "@/api/client/myPage/myPage";
import { useInfiniteQuery } from "@tanstack/react-query";

// 마이페이지 미팅 무한 스크롤 훅

export const useMyPageMeetings = ({
  type,
  category,
  size = 10,
}: {
  type: string;
  category?: string;
  size?: number;
}) => {
  return useInfiniteQuery({
    queryKey: ["meetings", type, category],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchMyPageMeetings({
        type,
        category,
        page: pageParam,
        size,
      });
      return {
        lighteningResponses: response?.lighteningResponses ?? [],
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const lighteningResponses = lastPage?.lighteningResponses ?? []; // null일 경우 빈 배열로 처리
      const hasMore = lighteningResponses.length === size; // size와 비교
      return hasMore ? lastPageParam + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5분 동안 데이터를 'fresh'하게 유지
    retry: 1, // 실패 시 1번 재시도
  });
};

// 마이페이지 리뷰 무한 스크롤 훅
export const useMyPageReviews = ({
  category,
  size = 10,
}: {
  category?: string;
  size?: number;
}) => {
  return useInfiniteQuery({
    queryKey: ["reviews", category],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchMyPageReviews({
        category,
        page: pageParam,
        size,
      });
      return {
        reviews: response?.reviews ?? [],
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const reviews = lastPage?.reviews ?? []; // null일 경우 빈 배열로 처리
      const hasMore = reviews.length === size; // size와 비교
      return hasMore ? lastPageParam + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5분 동안 데이터를 'fresh'하게 유지
    retry: 1, // 실패 시 1번 재시도
  });
};
