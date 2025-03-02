import { useInfiniteQuery } from '@tanstack/react-query';

import fetchMeeting from '@/api/meeting/fetchMeeting';

const useMeeting = ({
  category,
  city,
  town,
  date,
  initialMeetings,
}: {
  category: string;
  city: string;
  town: string;
  date: Date | null;
  per_page: number;
  initialMeetings: any[];
}) =>
  useInfiniteQuery({
    queryKey: ['meetings', category, city, town, date],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        return await fetchMeeting({
          category,
          city,
          town,
          date,
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
