import { useState, useEffect } from "react";
import { isUserLoggedIn } from "@/utils/auth/loginUtils";
import useLikeMutation from "@/hooks/like/useLikeMutation";

function useLikeStatus(meetingId: string, initialIsLiked: boolean) {
  const { mutate } = useLikeMutation();
  const [liked, setLiked] = useState(initialIsLiked);

  useEffect(() => {
    // 로그인하지 않은 경우 localStorage에서 좋아요 상태 확인
    const storedLikes = JSON.parse(
      localStorage.getItem("lighteningIds") || "[]",
    );
    if (storedLikes.includes(meetingId)) {
      setLiked(true);
    }
  }, [meetingId]);

  const toggleLike = () => {
    const isLoggedIn = isUserLoggedIn();

    if (isLoggedIn) {
      localStorage.clear();
      setLiked((prev) => !prev); // 낙관적 업데이트
      mutate(meetingId); // 서버 요청
    } else {
      const storedLikes = JSON.parse(
        localStorage.getItem("lighteningIds") || "[]",
      );

      let updatedLikes;
      if (storedLikes.includes(meetingId)) {
        updatedLikes = storedLikes.filter((id: string) => id !== meetingId);
        setLiked(false);
      } else {
        updatedLikes = [...storedLikes, meetingId];
        setLiked(true);
      }

      localStorage.setItem("lighteningIds", JSON.stringify(updatedLikes));
    }
  };

  return { liked, toggleLike };
}

export default useLikeStatus;
