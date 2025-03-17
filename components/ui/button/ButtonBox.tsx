import React from "react";

import Icon from "@/components/shared/Icon";
import chatStore from "@/store/chat/chatStore";
import modalStore from "@/store/modalStore";

export default function ButtonBox({
  isJoined,
  isCompleted,
  isHost,
  isConfirmed,
  targetAt,
  onJoin,
  onCancel,
  onDelete,
  onReview,
  chatIconDisabled,
  roomId,
}: {
  isJoined?: boolean;
  isCompleted?: boolean;
  isHost?: boolean;
  isConfirmed?: boolean;
  targetAt?: string;
  onJoin?: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
  onReview?: () => void;
  chatIconDisabled?: boolean;
  roomId?: number;
}) {
  const { openChat } = chatStore();
  const { openModal } = modalStore();

  // 현재 날짜와 타겟 날짜 비교해서 지났는지 확인
  const isTargetDatePassed = () => {
    if (!targetAt) return false;
    const currentDate = new Date();
    const meetingDate = new Date(targetAt);
    return currentDate > meetingDate;
  };

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

  const handleReview = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onReview) onReview();
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(`🟢 채팅 버튼 클릭됨! Room ID: ${roomId}`); // ✅ 로그 추가
    if (roomId) {
      openChat(roomId);
      console.log(`✅ chatStore 상태 업데이트: roomId=${roomId}, isOpen=true`);
    }
  };

  // 리뷰 버튼을 표시해야하는지 확인
  const showReviewButton = isConfirmed && isTargetDatePassed() && isJoined;

  return (
    <div className="flex size-auto gap-3">
      {showReviewButton ? (
        <button
          type="button"
          className="w-[100px] whitespace-nowrap rounded-[12px] border border-yellow-600 bg-white px-5 py-2.5 text-base font-semibold text-yellow-600"
          onClick={handleReview}
        >
          리뷰쓰기
        </button>
      ) : isHost ? (
        <button
          type="button"
          className="w-[100px] whitespace-nowrap rounded-[12px] border border-red-500 bg-white px-5 py-2.5 text-base font-semibold text-red-500"
          onClick={handleDelete}
        >
          번개 삭제
        </button>
      ) : isCompleted && !isJoined ? (
        <button
          type="button"
          className="w-[100px] whitespace-nowrap rounded-[12px] border border-black bg-white px-5 py-2.5 text-base font-semibold text-black"
          disabled
        >
          마감
        </button>
      ) : isJoined ? (
        <button
          type="button"
          className="w-[100px] whitespace-nowrap rounded-[12px] border border-black bg-white px-5 py-2.5 text-base font-semibold text-black"
          onClick={handleCancel}
        >
          번개 취소
        </button>
      ) : (
        <button
          type="button"
          className="flex w-[100px] rounded-[12px] bg-black px-5 py-2.5 text-base text-white"
          onClick={handleJoin}
        >
          번개 참여
        </button>
      )}

      {!chatIconDisabled && roomId && (
        <button
          type="button"
          className="h-[44px] w-auto rounded-[12px] bg-yellow-6 p-2.5"
          onClick={handleChatClick}
        >
          <Icon path="chat/chat" width="28px" height="24px" />
        </button>
      )}
    </div>
  );
}
