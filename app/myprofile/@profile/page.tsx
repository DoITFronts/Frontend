'use client';

import { fetchProfile } from '@/api/myPage/myPage';
import EditingIcon from '@/app/meeting/detail/components/EditingIcon';
import ProfileIcon from '@/components/shared/BaseProfile';
import useModalStore from '@/store/useModalStore';
import useProfileStore from '@/store/useProfileStore';
import { hover } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Page() {
  const [iconStatus, setIconStatus] = useState<'default' | 'hover' | 'editing'>('default');
  const [isLoading, setIsLoading] = useState(true);
  const { nickname, email, description, imageUrl } = useProfileStore();
  const { openModal } = useModalStore();

  useEffect(() => {
    fetchProfile();
  }, []);

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
      <ProfileIcon size={102} />

      <div className="w-auto h-auto flex flex-col gap-[2px]">
        <div className="w-auto h-auto flex justify-start gap-2.5">
          <span className="text-black font-pretandard font-bold text-2xl">{nickname}</span>
          <span className="text-black-6 font-pretandard font-medium text-lg">{email}</span>
        </div>
        <div className="w-auto h-auto text-black-10 font-pretandard text-xl">{description}</div>
      </div>
    </div>
  );
}
