import { useState, useEffect } from 'react';

export default function useLikeToggle(
  meetingId: string,
  initialLiked: boolean,
  onClick: () => void,
) {
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
    onClick();
  };

  return { isLiked, handleLikeClick };
}
