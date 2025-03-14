'use client';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/components/ui/button/Button';
import fireworkAnimation from '@/public/assets/landing/fireworks.json';
import Section01 from '@/public/assets/landing/section01.svg';
import Section02 from '@/public/assets/landing/section02.svg';
import Logo from '@/public/assets/logo/logoWhite.svg';

// FramerMotion
const fadeInVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Page() {
  const router = useRouter();

  return (
    <div className="w-full bg-black font-['Pretendard'] text-white">
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeInVariant}
        className="flex items-center justify-center"
      >
        <Lottie animationData={fireworkAnimation} loop />
        <div className="flex flex-col items-center pt-[16.375rem] sm:pt-[17.6875rem] md:pt-[17.625rem]">
          <Image
            src={Logo}
            className="md:w-[8.125rem] md:h-[1.7813rem] sm:w-[7.5rem] sm:h-[1.6438rem] w-[3.75rem] h-[0.825rem]"
            alt="번개팅 로고"
          />
          <div className="mt-5 mb-[1.5519rem] sm:mt-10 sm:mb-[3.125rem] md:mt-[56.43] md:mb-[5.0625rem] text-center text-3xl sm:text-6xl lg:text-7xl font-extrabold whitespace-nowrap">
            <h1>즉흥적인 만남은</h1>
            <h1 className="text-yellow-6">여기서 시작!</h1>
          </div>
          <Button
            color="white"
            onClick={() => router.push('meeting/list')}
            className="text-sm md:text-lg shadow-lg shadow-yellow-10 drop-shadow sm:w-[14.625rem] sm:h-[3.75rem] w-[6.25rem] h-[2.5rem]"
          >
            시작하기
          </Button>
        </div>
        <Lottie animationData={fireworkAnimation} loop />
      </motion.section>

      <section className="mt-[22.5625rem] sm:mt-[15.34rem] md:mt-[21.875rem] flex flex-col items-center gap-y-[24.625rem] sm:gap-y-[25rem] md:gap-y-[26.875rem] px-[0.9375rem] sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeInVariant}
          className="flex sm:flex-row flex-col-reverse sm:items-center gap-10 sm:gap-4 md:gap-[4.875rem] lg:w-[75rem] lg:px-[5%]"
        >
          <div className="">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-[1.875rem]">
              빠르게 약속을 잡고 싶다면?
              <br />
              번개팅으로.
            </h2>
            <p className="text-sm sm:text-xl font-extralight">
              바쁜 일상 속에서도 가볍게 즐길 수 있는 모임이 필요하신가요?
              <br />
              번개팅에서는 술자리, 보드게임, 카페, 맛집 등 다양한 번개 모임을 쉽게 탐색하고 즉시
              참여할 수 있어요. 직접 모임을 만들어 친구를 모집할 수도 있고, 실제 참여자들의 솔직한
              리뷰를 확인하며 원하는 번개를 선택할 수도 있죠.
            </p>
          </div>
          <Image
            src={Section01}
            className="w-[13.375rem] h-[13.375rem] sm:w-[40%] sm:h-[40%] md:w-[70%] md:h-[70%]"
            alt="section01"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeInVariant}
          className="flex sm:flex-row flex-col sm:items-center items-end item text-right gap-10 sm:gap-4 md:gap-[4.875rem] lg:w-[75rem] lg:px-[5%]"
        >
          <Image
            src={Section02}
            className="w-[13.375rem] h-[13.375rem] sm:w-[40%] sm:h-[40%] md:w-[70%] md:h-[70%]"
            alt="section02"
          />
          <div className="">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-[1.875rem]">
              모임 찾기부터 개설까지,
              <br />
              믿을 수 있는 번개⚡️
            </h2>
            <p className="text-sm sm:text-xl font-extralight">
              번개팅에서는 단순히 모임을 찾는 것뿐만 아니라, 실제 참여자들의 리뷰를 확인하고 소통할
              수 있어요. 참여 전에 유저들의 생생한 후기를 살펴보고, 궁금한 점이 있다면 채팅으로 직접
              질문해보세요! 주최자와 참가자 간의 자유로운 소통을 통해 모임 분위기, 일정, 준비
              사항까지 미리 체크할 수 있어요.
              <br />
              <br />
              이제는 신뢰할 수 있는 번개에서 더 편하게, 더 즐겁게 만나보세요!
            </p>
          </div>
        </motion.div>
      </section>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeInVariant}
        className="flex flex-col items-center justify-center pt-[32.0625rem] sm:pt-50 md:pt-[31.375rem] pb-[18.6875rem] sm:pb-[17.8125rem] md:pb-[17.1875rem]"
      >
        <h2 className=" pb-[3.125rem] xl:pb-[5.1875rem] text-center text-xl sm:text-3xl md:text-4xl font-bold whitespace-nowrap">
          오늘, 새로운 사람들과 번개처럼 <br />
          빠르게 만나보세요! 🚀
        </h2>
        <Button
          color="white"
          onClick={() => router.push('meeting/list')}
          className="sm:h-[3.75rem] sm:w-[14.625rem] h-[2.5rem] w-[6.25rem] text-sm sm:text-lg shadow-lg shadow-yellow-10 drop-shadow"
        >
          시작하기
        </Button>
      </motion.section>
    </div>
  );
}
