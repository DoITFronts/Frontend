import { useInfiniteQuery } from '@tanstack/react-query';

import fetchReview from '@/api/review/fetchReview';

const useReview = ({
  category,
  city,
  town,
  targetAt,
  size,
  initialReviews,
  order,
}: {
  category: string;
  city: string;
  town: string;
  targetAt: Date | null;
  size?: number;
  initialReviews: any[];
  order?: string;
}) =>
  useInfiniteQuery({
    queryKey: ['reviews', category, city, town, targetAt, order],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchReview({
        category,
        city,
        town,
        targetAt,
        page: pageParam,
        size,
        order,
      });
      return {
        reviews: response.reviews,
        totalCount: response.totalCount,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const reviews = lastPage?.reviews ?? [];
      const hasMore = reviews.length === size;
      return hasMore ? lastPageParam + 1 : undefined;
    },
    initialData: {
      pages: [
        {
          reviews: initialReviews ?? [],
          totalCount: initialReviews.length,
        },
      ],
      pageParams: [1],
    },
  });

export default useReview;
