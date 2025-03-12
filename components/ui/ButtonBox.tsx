import Icon from '@/components/shared/Icon';
import { useEffect, useState } from 'react';

export default function ButtonBox({
  isJoined,
  onClick,
  chatIconDisabled,
}: {
  isJoined?: boolean;
  onClick?: () => Promise<boolean>;
  chatIconDisabled?: boolean;
}) {
  const [localIsJoined, setLocalIsJoined] = useState(isJoined);

  useEffect(() => {
    setLocalIsJoined(isJoined);
  }, [isJoined]);

  const handleClick = async () => {
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

  return (
    <div className="w-auto h-auto flex gap-3">
      {localIsJoined ? (
        <button
          className="px-5 py-2.5 bg-white text-black text-base font-semibold rounded-[12px] w-[100px] border border-black whitespace-nowrap"
          onClick={handleClick}
        >
          번개 취소
        </button>
      ) : (
        <button
          className="px-5 py-2.5 bg-black text-white text-base rounded-[12px] w-[100px] flex"
          onClick={handleClick}
        >
          번개 참여
        </button>
      )}
      {chatIconDisabled ? (
        ''
      ) : (
        <div className="w-auto h-[44px] p-2.5 bg-yellow-6 rounded-[12px]">
          <Icon path="chat" width="28px" height="24px" />
        </div>
      )}
    </div>
  );
}
