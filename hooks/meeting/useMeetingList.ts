import { fetchMeetingList, FetchMeetingListParams } from '@/api/server/fetchMeeting';
import useListQuery from '@/hooks/useListQuery';

const useMeetingList = () =>
  useInfiniteQuery({
    queryKey: ['meetings', category, city, town, targetAt, size, order],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchMeeting({
        category,
        city,
        town,
        targetAt,
        page: pageParam, // ✅ 페이지 번호 추가
        size,
        order,
      });
      return {
        lighteningResponses: response?.lighteningResponses ?? [],
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

export default useMeetingList;
