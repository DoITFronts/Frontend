'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import Logo from '@/public/assets/mainLogo/logoYW.svg';

import Icon from '../shared/Icon';
import DropDown from '../ui/DropDown';

import { useRouter } from 'next/navigation';
import { useSignout } from '@/hooks/useAuth';

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

  //로그인 여부 체크하기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      setIsLoggedIn(!!token);
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

  return (
    <nav className="fixed left-0 top-0 z-50 flex h-[60px] w-full items-center bg-black px-3 shadow-md md:h-[60px] md:px-6 xl:px-[360px]">
      <div className="flex w-full justify-between">
        <div className="flex items-center justify-between gap-x-[31px] md:gap-x-[78px]">
          <Link href="/meeting/list" className="flex h-[17px] w-[75px] md:h-5 md:w-20">
            <Image
              src={Logo}
              alt="번개팅 메인 로고"
              width={80}
              height={20}
              priority
              loading="eager"
            />
          </Link>
          <div className="mr-5 flex gap-x-3 md:gap-x-6">
            <NavItem href="/meeting/list" label="번개 찾기" currentPath={pathname} />
            <NavItem href="/liked" label="찜한 번개" currentPath={pathname} />
            <NavItem href="/review" label="리뷰" currentPath={pathname} />
          </div>
        </div>
        <div>
          {isLoggedIn ? (
            // TODO: user 개인 프로필 이미지 분기처리
            <DropDown
              trigger={<Icon path="profile/userProfileDefault" width="37px" height="37px" />}
              options={['마이페이지', '로그아웃']}
              onSelect={handleDropDownItem}
              optionClassName="w-[110px] px-5 py-3 font-['Pretendard'] text-md font-semibold text-center hover:bg-yellow-5"
            />
          ) : (
            <div className="flex gap-5 mr-4">
              <NavItem href="/user/signin" label="로그인" currentPath={pathname} />
              <NavItem href="/user/signup" label="회원가입" currentPath={pathname} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
