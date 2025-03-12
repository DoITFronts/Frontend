import { useInfiniteQuery } from '@tanstack/react-query';

interface UseInfiniteListParams<T> {
  queryKey: (string | number | undefined)[];
  fetchFn: (params: { page: number }) => Promise<T>;
  size: number;
  initialData?: T;
}

const useInfiniteList = <T>({ queryKey, fetchFn, size, initialData }: UseInfiniteListParams<T>) =>
  useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchFn({ page: pageParam });
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const data = (lastPage ?? []) as NonNullable<T>[];
      const hasMore = data.length === size;
      return hasMore ? lastPageParam + 1 : undefined;
    },
    initialData: {
      pages: initialData ? [initialData] : [],
      pageParams: [1],
    },
  });

export default useInfiniteList;
