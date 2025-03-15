'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import Button from '@/components/ui/button/Button';

const fadeInVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="mt-[8%] flex w-full flex-col items-center justify-center font-['Pretendard'] text-white">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariant}
        className="flex flex-col items-center text-center"
      >
        {/* 텍스트 */}
        <div className="relative justify-center font-['DungGeunMo'] text-[100px] font-normal text-black lg:text-[160px]">
          Oops!
        </div>
        <div className="relative mb-6 justify-center">
          <span className="font-['DungGeunMo'] text-[50px] font-normal text-black lg:text-[100px]">
            404
          </span>
          <span className="font-['DungGeunMo'] text-[30px] font-normal text-black lg:text-[50px]">
            {' '}
          </span>
          <span className="font-['DungGeunMo'] text-[50px] font-normal text-black lg:text-[100px]">
            ERROR
          </span>
          <span className="font-['DungGeunMo'] text-[30px] font-normal text-black lg:text-[50px]">
            {' '}
          </span>
          <span className="font-['DungGeunMo'] text-[50px] font-normal text-black lg:text-[100px]">
            :(
          </span>
        </div>
        <div className="relative justify-center font-['Pretendard'] text-sm font-normal leading-normal text-black lg:text-2xl lg:leading-relaxed">
          찾을 수 없는 페이지입니다.
          <br />
          요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요 :(
        </div>
        <Button
          color="white"
          onClick={() => router.push('/')}
          className="mt-6 text-sm drop-shadow lg:h-[60px] lg:w-[170px] lg:text-xl"
        >
          홈으로 돌아가기
        </Button>
      </motion.div>
    </div>
  );
}
