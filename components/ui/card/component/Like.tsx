import HeartIcon from '@/'

function Like({
  meetingId,
  isLiked,
  onClick,
}: {
  meetingId: string;
  isLiked: boolean;
  onClick: (meetingId: string) => void;
}) {
  return (
    <button
      type="button"
      className="absolute left-[14px] top-[14px] flex justify-center"
      onClick={(event) => {
        event.stopPropagation(); // 부모 이벤트 전파 방지
        event.preventDefault(); // Link의 기본 동작(페이지 이동) 방지
        onClick(meetingId);
      }}
    >
      <HeartIcon variant={isLiked ? 'active' : 'inactive'} />
    </button>
  );
}

export default Like;
