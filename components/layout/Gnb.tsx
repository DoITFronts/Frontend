'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useSignout } from '@/hooks/user/useAuth';
import useLikedCount from '@/hooks/like/useLikeCount';
import Logo from '@/public/assets/logo/logoWhite.svg';
import useLikeCountStore from '@/store/useLikeCountStore';

import Icon from '@/components/utils/Icon';
import DropDown from '@/components/ui/dropdown/DropDown';

import { fetchProfile } from '@/api/client/myPage/myPage';
import useProfileStore from '@/store/useProfileStore';

function NavItem({
  href,
  label,
  currentPath,
}: {
  href: string;
  label: string;
  currentPath: string;
}) {
  const isActive = currentPath === href;

  return (
    <Link
      href={href}
      className={`flex items-center font-['Pretendard'] text-sm font-bold md:text-base ${
        isActive ? 'text-yellow-400' : 'text-white'
      }`}
    >
      {label}
    </Link>
  );
}

export default function GNB() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { mutate: logout } = useSignout();
  const { nickname, imageUrl } = useProfileStore(); //유저정보

  useLikedCount(); //좋아요 개수 동기화

  // 로그인 여부 체크하기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      setIsLoggedIn(!!token);
      if (token) {
        fetchProfile();
      }
    }
  }, []);

  // 드롭다운 아이템 Click시 handler
  const handleDropDownItem = (item: string) => {
    if (item === '마이페이지') {
      router.push('/myprofile'); // 마이페이지로 이동
    } else if (item === '로그아웃') {
      logout(); // 로그아웃 처리
      setIsLoggedIn(false);
    }
  };
  const { likedCount } = useLikeCountStore();
  return (
    <nav className="fixed left-0 top-0 z-50 flex h-[60px] w-full items-center bg-black px-[15%] shadow-md md:h-[60px]">
      <div className="flex w-full justify-between">
        <div className="flex items-center justify-between gap-x-[31px] md:gap-x-[78px]">
          <Link href="/meeting/list" className="flex h-[17px] w-[75px] md:h-5 md:w-20">
            {/* TODO 이거 priority만 있어도 되는거 맞나? */}
            <Image src={Logo} alt="번개팅 메인 로고" width={80} height={20} priority />
          </Link>
          <div className="mr-5 flex gap-x-3 md:gap-x-6">
            <NavItem href="/meeting/list" label="번개 찾기" currentPath={pathname} />
            <div className="flex items-center justify-center gap-1">
              <NavItem href="/liked" label="찜한 번개" currentPath={pathname} />
              {/* TODO: 좋아요 count 받아야함 */}
              {likedCount() > 0 && (
                <span className="mb-[1.5px] h-fit rounded-full bg-yellow-6 px-[5px] text-center text-[12px] font-bold text-black">
                  {likedCount()}
                </span>
              )}
            </div>
            <NavItem href="/review" label="리뷰" currentPath={pathname} />
          </div>
        </div>
        {/* 로그인 여부 & 프로필 사진 유무에 따른 분기처리 */}
        {isLoggedIn ? (
          <div className="flex items-center">
            <DropDown
              trigger={
                imageUrl ? (
                  <div className="flex items-center gap-3 overflow-hidden mt-2">
                    <img
                      src={`${imageUrl}?timestamp=${new Date().getTime()}`}
                      alt="프로필 이미지"
                      className="object-cover w-[37px] h-[37px] rounded-full"
                    />
                    <div className="font-semibold text-white">{nickname}</div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 overflow-hidden mt-2">
                    <Icon path="profile/userProfileDefault" width="37px" height="37px" />
                    <div className="font-semibold text-white">{nickname}</div>
                  </div>
                )
              }
              options={['마이페이지', '로그아웃']}
              onSelect={handleDropDownItem}
              optionClassName="w-[110px] px-5 py-3 font-['Pretendard'] text-md font-semibold text-center hover:bg-yellow-5"
            />
          </div>
        ) : (
          <div className="mr-4 flex gap-5">
            <NavItem href="/user/signin" label="로그인" currentPath={pathname} />
            <NavItem href="/user/signup" label="회원가입" currentPath={pathname} />
          </div>
        )}
      </div>
    </nav>
  );
}
