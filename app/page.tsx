'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Logo from '@/public/assets/logoWhite.svg';
import Image from 'next/image';
import Section01 from '@/public/assets/landing/section01.svg';
import Section02 from '@/public/assets/landing/section02.svg';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import fireworkAnimation from '@/public/assets/landing/fireworks.json';

//FramerMotion
const fadeInVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Page() {
  const router = useRouter();

  return (
    <div className="bg-black w-full font-['Pretendard'] text-white">
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariant}
        className="flex items-center justify-center gap-6"
      >
        <Lottie animationData={fireworkAnimation} loop />
        <div className="text-[80px] font-extrabold leading-[100px]  pt-[10%] pb-[350px] flex flex-col items-center">
          <Image src={Logo} height={41} width={181} alt="번개팅 로고" />
          <div className="mt-[50px] mb-[81px] text-center">
            <h1>즉흥적인 만남은</h1>
            <h1 className="text-yellow-6">여기서 시작!</h1>
          </div>
          <Button
            color="white"
            onClick={() => router.push('user/signup')}
            className="w-[234px] h-[60px] text-lg shadow-lg shadow-yellow-10 drop-shadow"
          >
            시작하기
          </Button>
        </div>
        <Lottie animationData={fireworkAnimation} loop />
      </motion.section>
      <section className="flex flex-col items-center justify-center gap-y-[330px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariant}
          className="flex gap-x-[78px] items-center"
        >
          <div className="gap-[30px] w-[714px]">
            <h2 className="text-[40px] font-bold">
              빠르게 약속을 잡고 싶다면?
              <br />
              번개팅으로.
            </h2>
            <p className="text-xl font-extralight leading-[34px]">
              바쁜 일상 속에서도 가볍게 즐길 수 있는 모임이 필요하신가요?
              <br />
              번개팅에서는 술자리, 보드게임, 카페, 맛집 등 다양한 번개 모임을 쉽게 탐색하고 즉시
              참여할 수 있어요.
            </p>
          </div>
          <Image src={Section01} width={408} height={408} alt="section01" />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariant}
          className="flex gap-x-[78px] items-center"
        >
          <Image src={Section02} width={408} height={408} alt="section02" />
          <div className="w-[714px]">
            <h2 className="text-[40px] font-bold">
              모임 찾기부터 개설까지,
              <br />
              믿을 수 있는 번개⚡️
            </h2>
            <p className="text-xl font-extralight leading-[34px]">
              번개팅에서는 단순히 모임을 찾는 것뿐만 아니라, 실제 참여자들의 리뷰를 확인하고 소통할
              수 있어요.
            </p>
          </div>
        </motion.div>
      </section>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariant}
        className="flex flex-col justify-center items-center pb-[10%]"
      >
        <h2 className="text-[40px] font-bold leading-[55px] text-center pb-[83px] pt-[502px]">
          오늘, 새로운 사람들과 번개처럼 <br />
          빠르게 만나보세요! 🚀
        </h2>
        <Button
          color="white"
          onClick={() => router.push('user/signup')}
          className="w-[234px] h-[60px] text-lg shadow-lg shadow-yellow-10 drop-shadow"
        >
          시작하기
        </Button>
      </motion.section>
    </div>
  );
}
