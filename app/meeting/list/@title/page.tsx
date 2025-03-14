'use client';

import Button from '@/components/ui/button/Button';
import useModalStore from '@/store/useModalStore';

export default function Header() {
  const { openModal } = useModalStore();

  return (
    <div className="flex flex-col items-start justify-between sm:flex-row">
      <div className="flex flex-col items-start gap-3">
        <div className="text-start align-middle font-dunggeunmo text-2xl font-normal leading-[100%] tracking-[-0.06em] text-black sm:whitespace-pre-line md:whitespace-normal md:text-3xl">
          맛집 탐방 같이 갈 사람,
          <span className="block sm:inline"> 누구 없나요?</span>
        </div>
        <div className="text-start align-middle font-pretandard text-base font-normal leading-[100%] tracking-normal text-black md:text-[22px]">
          망설이면 자리 없어요! 선착순 모집중~
        </div>
      </div>
      <Button
        color="white"
        className="mt-[18px] w-[100px] sm:mt-0 lg:w-[150px]"
        type="submit"
        onClick={() => openModal('create')}
      >
        번개 만들기
      </Button>
    </div>
  );
}
