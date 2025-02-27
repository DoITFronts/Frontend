import { useInfiniteQuery } from '@tanstack/react-query';

import fetchMeeting from '@/api/meeting/fetchMeeting';

const useMeeting = ({
  category,
  location1,
  location2,
  date,
  per_page,
  initialMeetings,
}: {
  category: string;
  location1: string;
  location2: string;
  date: Date | null;
  per_page: number;
  initialMeetings: any[];
}) =>
  useInfiniteQuery({
    queryKey: ['meetings', category, location1, location2, date],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        return await fetchMeeting({
          category,
          location1,
          location2,
          date,
          page: pageParam,
          per_page,
        });
      } catch (error) {
        console.error('Failed to fetch meetings:', error);
        throw error;
      }
    },
    initialPageParam: 2,
    getNextPageParam: (lastPage) =>
      lastPage?.next && lastPage.next <= lastPage.last ? lastPage.next : undefined,
    initialData: {
      pages: [initialMeetings], // 초기 데이터 유지
      pageParams: [1], // 첫 번째 페이지는 SSR에서 가져온 데이터
    },
  });

export default useMeeting;
