import { useState, useEffect } from 'react';
import useLikeCountStore from '@/store/useLikeCountStore';

export default function useLikeToggle(
  meetingId: string,
  initialLiked: boolean,
  onClick: () => void,
) {
  const { likedMeetings, toggleLike } = useLikeCountStore();
  const [isLiked, setIsLiked] = useState<boolean>(initialLiked);

  useEffect(() => {
    const storedLikeStatus = localStorage.getItem(`like-status-${meetingId}`);
    if (storedLikeStatus !== null) {
      setIsLiked(JSON.parse(storedLikeStatus));
    }
  }, [meetingId]);

  const handleLikeClick = () => {
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    localStorage.setItem(`like-status-${meetingId}`, JSON.stringify(newLikeStatus));

    toggleLike(meetingId);
    onClick();
  };

  return { isLiked, handleLikeClick };
}
