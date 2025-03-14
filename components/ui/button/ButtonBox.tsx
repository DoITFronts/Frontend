import { useEffect, useState } from 'react';

import Icon from '@/components/utils/Icon';

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

  return (
    <div className="flex size-auto gap-3">
      {localIsJoined ? (
        <button
          className="w-[100px] whitespace-nowrap rounded-[12px] border border-black bg-white px-5 py-2.5 text-base font-semibold text-black"
          onClick={handleClick}
        >
          번개 취소
        </button>
      ) : (
        <button
          className="flex w-[100px] rounded-[12px] bg-black px-5 py-2.5 text-base text-white"
          onClick={handleClick}
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
