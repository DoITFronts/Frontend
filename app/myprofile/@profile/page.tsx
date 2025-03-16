'use client';

import { useEffect, useState } from 'react';

import { fetchProfile } from '@/api/client/myPage/myPage';
import EditingIcon from '@/app/meeting/detail/components/EditingIcon';
import ProfileIcon from '@/components/utils/BaseProfile';
import modalStore from '@/store/modalStore';
import profileStore from '@/store/profileStore';

export default function Page() {
  const [iconStatus, setIconStatus] = useState<'default' | 'hover' | 'editing'>('default');
  const { nickname, email, description, imageUrl } = profileStore();
  const { openModal } = modalStore();

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="relative flex h-auto w-full items-center gap-6">
      <div
        className="absolute right-0 top-3 cursor-pointer"
        onMouseEnter={() => setIconStatus('hover')}
        onMouseLeave={() => setIconStatus('default')}
        onClick={() => openModal('editProfile')}
      >
        <EditingIcon status={iconStatus} />
      </div>
      {imageUrl ? (
        <div className="size-[102px] overflow-hidden rounded-full">
          <img
            src={`${imageUrl}?timestamp=${new Date().getTime()}`}
            alt="프로필 이미지"
            className="size-full object-cover"
          />
        </div>
      ) : (
        <ProfileIcon size={102} />
      )}

      <div className="flex size-auto flex-col gap-[2px]">
        <div className="flex size-auto justify-start gap-2.5">
          <span className="font-pretandard text-2xl font-bold text-black">{nickname}</span>
          <span className="font-pretandard text-lg font-medium text-black-6">{email}</span>
        </div>
        <div className="size-auto font-pretandard text-xl text-black-10">{description}</div>
      </div>
    </div>
  );
}
