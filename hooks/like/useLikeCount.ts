import { useEffect } from 'react';

import useListQuery from '@/hooks/list/useListQuery';
import useLikeCountStore from '@/store/useLikeCountStore';

const useLikedCount = () => {
  const { data } = useListQuery({
    category: '',
    city: '',
    town: '',
    targetAt: null,
    size: 10,
    initialMeetings: [],
  });

  const { setLikedMeetings } = useLikeCountStore();

  useEffect(() => {
    if (data?.pages) {
      const allLikedMeetings = data.pages.flatMap((page) =>
        page.lighteningResponses.map((meeting: any) => meeting.id),
      );
      setLikedMeetings(allLikedMeetings);
    }
  }, [data, setLikedMeetings]);
};

export default useLikedCount;
