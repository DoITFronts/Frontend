import HeartIcon from '@/components/Icons/HeartIcon';
import useLikeMutation from '@/hooks/useLikeMutation';
import { useState } from 'react';

function Like({ meetingId, isLiked }: { meetingId: string; isLiked: boolean }) {
  const { mutate } = useLikeMutation();
  const [liked, setLiked] = useState(isLiked);
  return (
    <button
      type="button"
      className="absolute left-[14px] top-[14px] flex justify-center"
      onClick={(event) => {
        event.stopPropagation(); // 부모 이벤트 전파 방지
        event.preventDefault(); // Link의 기본 동작(페이지 이동) 방지
        mutate(meetingId); // 좋아요 기능 동작하도록 함. mutation
      }}
    >
      <HeartIcon variant={liked ? 'active' : 'inactive'} />
    </button>
  );
}

export default Like;
