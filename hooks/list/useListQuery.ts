import { useQuery } from '@tanstack/react-query';

interface UseListQueryParams<T> {
  queryKey: (string | number | undefined)[];
  fetchFn: () => Promise<T>;
  initialData?: T;
}

const useListQuery = <T>({ queryKey, fetchFn, initialData }: UseListQueryParams<T>) =>
  useQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetchFn();
      return response;
    },
    initialData,
  });

export default useListQuery;