import {
  fetchMyPageMeetings,
  FetchMyPageMeetingsParams,
  fetchMyPageReviews,
  FetchParams,
} from '@/api/myPage/myPage';
import { useQuery } from '@tanstack/react-query';

export const useMyPageMeetings = (params: FetchMyPageMeetingsParams) => {
  return useQuery({
    queryKey: ['meetings', params.type, params.category],
    queryFn: () => fetchMyPageMeetings(params),
    staleTime: 5 * 60 * 1000, // 5분 동안 데이터를 'fresh'하게 유지
    retry: 1, // 실패 시 1번 재시도
  });
};

export const useMyPageReviews = (params: FetchParams = {}) => {
  return useQuery({
    queryKey: ['meetings', params.category],
    queryFn: () => fetchMyPageReviews(params),
    staleTime: 5 * 60 * 1000, // 5분 동안 데이터를 'fresh'하게 유지
    retry: 1, // 실패 시 1번 재시도
  });
};
