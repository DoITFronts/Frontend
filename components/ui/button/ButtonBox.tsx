import React from 'react';
import Icon from '@/components/shared/Icon';

export default function ButtonBox({
  isJoined,
  isCompleted,
  isHost,
  onJoin,
  onCancel,
  onDelete,
  chatIconDisabled,
}: {
  isJoined?: boolean;
  isCompleted?: boolean;
  isHost?: boolean;
  onJoin?: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
  chatIconDisabled?: boolean;
}) {
  // 클릭 핸들러들 - 단순히 props로 전달받은 함수를 호출
  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onJoin) onJoin();
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onCancel) onCancel();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onDelete) onDelete();
  };

  return (
    <div className="flex size-auto gap-3">
      {isHost ? (
        <button
          className="w-[100px] whitespace-nowrap rounded-[12px] border border-red-500 bg-white px-5 py-2.5 text-base font-semibold text-red-500"
          onClick={handleDelete}
        >
          번개 삭제
        </button>
      ) : isCompleted && !isJoined ? (
        <button
          className="w-[100px] whitespace-nowrap rounded-[12px] border border-black bg-white px-5 py-2.5 text-base font-semibold text-black"
          disabled
        >
          마감
        </button>
      ) : isJoined ? (
        <button
          className="w-[100px] whitespace-nowrap rounded-[12px] border border-black bg-white px-5 py-2.5 text-base font-semibold text-black"
          onClick={handleCancel}
        >
          번개 취소
        </button>
      ) : (
        <button
          className="flex w-[100px] rounded-[12px] bg-black px-5 py-2.5 text-base text-white"
          onClick={handleJoin}
        >
          번개 참여
        </button>
      )}
      {chatIconDisabled ? (
        ''
      ) : (
        <div className="h-[44px] w-auto rounded-[12px] bg-yellow-6 p-2.5">
          <Icon path="chat" width="28px" height="24px" />
        </div>
      )}
    </div>
  );
}
