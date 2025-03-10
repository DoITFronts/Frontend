'use client';

import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

import { joinLightning, leaveLightning } from '@/api/meeting/joinMeeting';
import {
  BottomFloatingBarError,
  BottomFloatingBarSkeleton,
} from '@/app/meeting/detail/components/skeleton/BottomFloatingBarSkeleton';
import Button from '@/components/ui/Button';
import ChatModal from '@/components/ui/chatting/ChattingModal';
import { useMeetingDetail } from '@/hooks/useMeetingDetail';
import useChatStore from '@/store/chatStore';
import useModalStore from '@/store/useModalStore';
import isUserLoggedIn from '@/utils/authUtils';

const CATEGORY_TEXTS: Record<string, { title: string; subtitle: string }> = {
  ALCOHOL: {
    title: '퇴근 후, 함께하는 가볍고 기분 좋은 한 잔! 🍻',
    subtitle: '혼자 마시기 아쉬울 때, 같이 한잔하며 하루를 마무리해 봐요!',
  },
  CAFE: {
    title: '카페 모임 ☕',
    subtitle: '커피 한 잔 하면서 이야기 나눠요!',
  },
  BOARD_GAME: {
    title: '보드게임 덕후들 모여라! 🎲',
    subtitle: '가벼운 게임부터 치열한 두뇌 싸움까지! 함께하면 더 재미있어요!',
  },
  GOURMET: {
    title: '찐 로컬 맛집, 같이 가 볼 사람? 🍜',
    subtitle: '숨은 맛집 찾아다니는 재미! 함께 맛있는 음식과 즐거운 수다를 나눠 봐요:)',
  },
};

export default function BottomFloatingBar() {
  const { data: meeting, isLoading, error } = useMeetingDetail();
  const [isJoined, setIsJoined] = useState(false);
  const { openModal } = useModalStore();
  const { setOpenChat } = useChatStore();

  useEffect(() => {
    if (meeting) {
      setIsJoined(meeting.isJoined ?? false);
    }
  }, [meeting]);

  const handleJoinToggle = async () => {
    if (!isUserLoggedIn()) {
      openModal('loginCheck');
      return;
    }

    if (isJoined) {
      await leaveLightning(meeting?.id as string);
      toast.success('모임 참여를 취소했습니다.', { autoClose: 900 });
    } else {
      await joinLightning(meeting?.id as string);
      toast.success('모임에 참여했습니다.', { autoClose: 900 });
      setOpenChat(true);
    }
    setIsJoined((prev) => !prev);
  };

  if (isLoading) return <BottomFloatingBarSkeleton />;
  if (error) return <BottomFloatingBarError onRetry={() => window.location.reload()} />;

  const category = meeting?.category as 'ALCOHOL' | 'CAFE' | 'BOARD_GAME' | 'GOURMET';

  return (
    <div className="fixed bottom-0 left-0 z-[100] flex h-[84px] w-full flex-col flex-wrap items-center justify-center overflow-hidden border-t-2 border-gray-900 bg-white p-5">
      <div className="flex w-full max-w-5xl items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-base font-semibold leading-normal text-gray-900">
            {CATEGORY_TEXTS[category]?.title}
          </div>
          <div className="text-xs font-medium leading-none text-gray-700">
            {CATEGORY_TEXTS[category]?.subtitle}
          </div>
        </div>
        <Button color={isJoined ? 'white' : 'filled'} type="button" onClick={handleJoinToggle}>
          {isJoined ? '참여 취소하기' : '참여하기'}
        </Button>
      </div>
      {ChatModal({ isOpen: false, onClose: () => {} })}
    </div>
  );
}
