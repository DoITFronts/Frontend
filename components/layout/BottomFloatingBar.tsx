'use client';

import { useState } from 'react';

import { toast } from 'react-toastify';
import { joinLightning, leaveLightning } from '@/api/meeting/joinMeeting';
import useModalStore from '@/store/useModalStore';
import isUserLoggedIn from '@/utils/authUtils';

import Button from '../ui/Button';

interface BottomFloatingBarProps {
  id: string;
  title: string;
  subtitle: string;
}

export default function BottomFloatingBar({ id, title, subtitle }: BottomFloatingBarProps) {
  const [isJoined, setIsJoined] = useState(false);
  const { openModal } = useModalStore();

  const handleJoinToggle = async () => {
    if (!isUserLoggedIn()) {
      openModal('loginCheck');
      return;
    }

    if (isJoined) {
      await leaveLightning(id);
    } else {
      await joinLightning(id);
      toast.success('참가 신청이 완료되었습니다.', { autoClose: 900 });
    }
    setIsJoined(!isJoined);
  };

  return (
    <div className="fixed bottom-0 left-0 z-[100] flex h-[84px] w-full flex-col flex-wrap items-center justify-center overflow-hidden border-t-2 border-gray-900 bg-white p-5">
      <div className="flex w-full max-w-5xl items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-base font-semibold leading-normal text-gray-900">{title} 🏃‍♂️</div>
          <div className="text-xs font-medium leading-none text-gray-700">{subtitle}</div>
        </div>
        <Button color={isJoined ? 'white' : 'filled'} type="button" onClick={handleJoinToggle}>
          {isJoined ? '참여 취소하기' : '참여하기'}
        </Button>
      </div>
    </div>
  );
}
