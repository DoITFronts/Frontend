'use client';

import EditingIcon from '@/app/meeting/detail/components/EditingIcon';
import ProfileIcon from '@/components/shared/BaseProfile';
import useModalStore from '@/store/useModalStore';
import { hover } from 'framer-motion';
import { useState } from 'react';

export default function Page() {
  const [nickname, setNickname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userBio, setUserBio] = useState('');
  const [iconStatus, setIconStatus] = useState<'default' | 'hover' | 'editing'>('default');

  const { openModal } = useModalStore();

  return (
    <div className="w-full h-auto flex gap-6 items-center relative">
      <div
        className="cursor-pointer absolute top-3 right-0"
        onMouseEnter={() => setIconStatus('hover')}
        onMouseLeave={() => setIconStatus('default')}
        onClick={() => openModal('editProfile')}
      >
        <EditingIcon status={iconStatus} />
      </div>
      <ProfileIcon theme="light" size={102} />
      <div className="w-auto h-auto flex flex-col gap-[2px]">
        <div className="w-auto h-auto flex justify-start gap-2.5">
          <span className="text-black font-pretandard font-bold text-2xl">{nickname}</span>
          <span className="text-black-6 font-pretandard font-medium text-lg">
            shy.penguin@codeit.com
          </span>
        </div>
        <div className="w-auto h-auto text-black-10 font-pretandard text-xl">
          안녕하세요🙂 저는 조용하지만 할 말은 꼭 하는, 적당히 수줍은 펭귄입니다. 🐧
        </div>
      </div>
    </div>
  );
}
