import { useInfiniteQuery } from '@tanstack/react-query';

import fetchMeeting from '@/api/meeting/fetchMeeting';

const useMeeting = ({
  category,
  city,
  town,
  targetAt,
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
      try {
        return await fetchMeeting({
          category,
          city,
          town,
          targetAt,
        });
      } catch (error) {
        console.error('Failed to fetch meetings:', error);
        throw error;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage?.next && lastPage.next <= lastPage.last ? lastPage.next : undefined,
    initialData: {
      pages: [
        {
          data: {
            lighteningResponses: initialMeetings,
          },
        },
      ],
      pageParams: [1],
    },
  });

export default useMeeting;
