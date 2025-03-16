import { useEffect } from 'react';
import useLikeMeeting from '@/hooks/like/useLikeMeeting';
import likeCountStore from '@/store/likeCountStore';

const useLikedCount = () => {
  const { data } = useLikeMeeting({
    category: '',
    city: '',
    town: '',
    targetAt: null,
    size: 10,
    initialMeetings: [],
  });

  const { setLikedMeetings } = likeCountStore();

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
