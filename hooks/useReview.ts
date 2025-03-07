import { useInfiniteQuery } from '@tanstack/react-query';

import fetchReviews from '../api/meeting/fetchReviews';

const useMeeting = ({
  category,
  city,
  town,
  targetAt,
  size,
  initialMeetings,
}: {
  category: string;
  city: string;
  town: string;
  targetAt: Date | null;
  size: number;
  initialMeetings: any[];
}) =>
  useInfiniteQuery({
    queryKey: ['meetings', category, city, town, targetAt],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchReviews({
        category,
        city,
        town,
        targetAt,
        page: pageParam, // ✅ 페이지 번호 추가
        size,
      });
      return {
        lighteningResponses: response.lighteningResponses,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const lighteningResponses = lastPage?.lighteningResponses ?? []; // `null`일 경우 빈 배열로 처리
      const hasMore = lighteningResponses.length === size; // `size` 비교
      return hasMore ? lastPageParam + 1 : undefined;
    },

    initialData: {
      pages: [
        {
          lighteningResponses: initialMeetings ?? [],
        },
      ],
      pageParams: [1],
    },
  });

export default useMeeting;
