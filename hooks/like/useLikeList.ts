import { fetchLikeMeetingList } from '@/api/server/fetchMeeting';
import useListQuery from '@/hooks/list/useListQuery';

const useLikeList = () =>
  useListQuery({
    queryKey: ['liked-meetings'],
    fetchFn: async () => {
      const response = await fetchLikeMeetingList();
      return response ?? [];
    },
    initialData: [],
  });

export default useLikeList;
