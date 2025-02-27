import HeartIcon from '@/components/shared/Icons/HeartIcon';

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
      onClick={() => onClick(meetingId)}
    >
      <HeartIcon variant={isLiked ? 'active' : 'inactive'} />
    </button>
  );
}

export default Like;
