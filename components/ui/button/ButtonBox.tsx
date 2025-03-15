import { useEffect, useState } from 'react';

import Icon from '@/components/utils/Icon';
import chatStore from '@/store/chatStore';

export default function ButtonBox({
  isJoined,
  onClick,
  chatIconDisabled,
  roomId,
}: {
  isJoined?: boolean;
  onClick?: () => Promise<boolean>;
  chatIconDisabled?: boolean;
  roomId?: number;
}) {
  const [localIsJoined, setLocalIsJoined] = useState(isJoined);
  const { openChat } = chatStore();

  useEffect(() => {
    setLocalIsJoined(isJoined);
  }, [isJoined]);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setLocalIsJoined(!localIsJoined);

    if (onClick) {
      try {
        const success = await onClick();
        if (!success) {
          setLocalIsJoined(localIsJoined);
        }
      } catch {
        setLocalIsJoined(localIsJoined);
      }
    }
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (roomId) {
      openChat(roomId);
    }
  };

  return (
    <div className="flex size-auto gap-3">
      {localIsJoined ? (
        <button
          type="button"
          className="w-[100px] whitespace-nowrap rounded-[12px] border border-black bg-white px-5 py-2.5 text-base font-semibold text-black"
          onClick={handleClick}
        >
          번개 취소
        </button>
      ) : (
        <button
          type="button"
          className="flex w-[100px] rounded-[12px] bg-black px-5 py-2.5 text-base text-white"
          onClick={handleClick}
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
          <Icon path="chat" width="28px" height="24px" />
        </button>
      )}
    </div>
  );
}
