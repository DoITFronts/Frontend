'use client';

import ProfileIcon from '@/components/shared/BaseProfile';
import { useState } from 'react';

export default function Page() {
  const [nickname, setNickname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userBio, setUserBio] = useState('');

  return (
    <div className="w-full h-auto flex gap-6 items-center">
      <ProfileIcon theme="light" size={102} />
      <div className="w-auto h-auto flex flex-col gap-[2px]">
        <div className="w-auto h-auto flex justify-start gap-2.5">
          <span className="text-black font-pretandard font-bold text-2xl">{nickname}</span>
          <span className="text-black-6 font-pretandard font-medium text-lg">{userEmail}</span>
        </div>
        <div className="w-auto h-auto text-black-10 font-pretandard text-xl">{userBio}</div>
      </div>
    </div>
  );
}
