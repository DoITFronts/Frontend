import { useInfiniteQuery } from '@tanstack/react-query';

import fetchMeeting from '@/api/meeting/fetchMeeting';

const useMeeting = ({
  category,
  city,
  town,
  targetAt,
  per_page,
  initialMeetings,
}: {
  category: string;
  city: string;
  town: string;
  targetAt: Date | null;
  per_page: number;
  initialMeetings: any[];
}) =>
  useInfiniteQuery({
    queryKey: ['meetings', category, city, town, targetAt],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchMeeting({
        category,
        city,
        town,
        targetAt,
        page: pageParam, // ✅ 페이지 번호 추가
        per_page,
      });
      return {
        lighteningResponses: response.lighteningResponses,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const lighteningResponses = lastPage?.lighteningResponses ?? []; // `null`일 경우 빈 배열로 처리
      const hasMore = lighteningResponses.length === per_page; // `per_page` 비교
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
