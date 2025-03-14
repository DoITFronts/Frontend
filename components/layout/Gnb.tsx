'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import Icon from '@/components/shared/Icon';
import DropDown from '@/components/ui/dropdown/DropDown';
import useLikedCount from '@/hooks/useLikeCount';
import Logo from '@/public/assets/logo/logoWhite.svg';
import useLikeCountStore from '@/store/useLikeCountStore';
import useProfileStore from '@/store/useProfileStore';
import { useSignout } from '@/hooks/user/useSignout';
import { isUserLoggedIn } from '@/utils/auth/loginUtils';

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
      className={`flex items-center font-['Pretendard'] text-sm md:text-base font-bold text-center ${
        isActive ? 'text-yellow-400' : 'text-white'
      }`}
    >
      {label}
    </Link>
  );
}

export default function GNB() {
  const pathname = usePathname();
  const router = useRouter();
  const { mutate: logout } = useSignout();
  const { nickname, imageUrl } = useProfileStore(); // 유저정보

  useLikedCount(); // 좋아요 개수 동기화

  // 드롭다운 아이템 Click시 handler
  const handleDropDownItem = (item: string) => {
    if (item === '마이페이지') {
      router.push('/myprofile'); // 마이페이지로 이동
    } else if (item === '로그아웃') {
      logout(); // 로그아웃 처리
    }
  };
  const { likedCount } = useLikeCountStore();

  return (
    <nav className="flex items-center justify-center fixed left-0 top-0 z-50 h-[3.5625rem] sm:h-[3.75rem] w-full  bg-black shadow-md px-[1.1875rem] sm:px-[1.4375rem]">
      <div className="flex justify-between w-full lg:w-[75rem]">
        <div className="flex items-center justify-between w-[16.9375rem] md:w-[20.625rem] gap-2">
          <Link href="/meeting/list" className="h-[1.0625rem] w-[4.6875rem] md:h-5 md:w-20">
            {/* TODO 이거 priority만 있어도 되는거 맞나? */}
            <Image src={Logo} alt="번개팅 메인 로고" width={73.62} height={16.2} priority />
          </Link>
          <div className="flex items-center md:gap-6 sm:gap-3 gap-2 ml-1 break-keep">
            <NavItem href="/meeting/list" label="번개 찾기" currentPath={pathname} />
            <div className="flex items-center">
              <NavItem href="/liked" label="찜한 번개" currentPath={pathname} />
              {likedCount() > 0 && (
                <span className="mb-[0.0938rem] ml-[0.375rem] h-fit rounded-full bg-yellow-6 px-[0.3125rem] text-center text-[0.625rem] font-bold text-black">
                  {likedCount()}
                </span>
              )}
            </div>
            <NavItem href="/review" label="리뷰" currentPath={pathname} />
          </div>
        </div>
        {/* 로그인 여부 & 프로필 사진 유무에 따른 분기처리 */}
        {isUserLoggedIn() ? (
          <div>
            <DropDown
              trigger={
                imageUrl ? (
                  <div className="mt-1 flex items-center overflow-hidden gap-1 md:gap-[0.625rem] ml-1 md:ml-5">
                    <img
                      src={`${imageUrl}?timestamp=${new Date().getTime()}`}
                      alt="프로필 이미지"
                      className="size-[1.875rem] md:size-[2.25rem] rounded-full object-cover"
                    />
                    <div className="hidden sm:block font-bold text-white text-sm md:text-base whitespace-nowrap">
                      {nickname}
                    </div>
                  </div>
                ) : (
                  <div className="mt-1 flex items-center overflow-hidden gap-1 md:gap-[0.625rem] ml-1 md:ml-5">
                    <Icon path="profile/userProfileDefault" width="36px" height="36px" />
                    <div className="hidden sm:block font-bold text-white text-sm md:text-base whitespace-nowrap">
                      {nickname}
                    </div>
                  </div>
                )
              }
              options={['마이페이지', '로그아웃']}
              onSelect={handleDropDownItem}
              optionClassName="w-[6.875rem] px-5 py-3 font-['Pretendard'] text-md font-semibold text-center hover:bg-yellow-5"
            />
          </div>
        ) : (
          <div className="flex gap-2 whitespace-nowrap ml-1">
            <NavItem href="/user/signin" label="로그인" currentPath={pathname} />
            <NavItem href="/user/signup" label="회원가입" currentPath={pathname} />
          </div>
        )}
      </div>
    </nav>
  );
}
