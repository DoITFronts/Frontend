import { useInfiniteQuery } from '@tanstack/react-query';

import fetchLikeMeeting from '@/api/meeting/fetchLikeMeeting';
const useLikeMeeting = ({
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
      const response = await fetchLikeMeeting({
        category,
        city,
        town,
        targetAt,
        page: pageParam, // ✅ 페이지 번호 추가
        per_page,
      });
      return {
        lighteningResponses: response.lighteningResponses ?? [], //없으면 빈 배열 반환
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) =>
      lastPage?.lighteningResponses && lastPage?.lighteningResponses.length === per_page
        ? lastPageParam + 1
        : undefined,

    initialData: {
      pages: [
        {
          lighteningResponses: initialMeetings ?? [], //없으면 빈 배열 반환
        },
      ],
      pageParams: [1],
    },
  });

export default useLikeMeeting;
