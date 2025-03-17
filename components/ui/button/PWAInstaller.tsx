'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/ui/button/Button';
import { PWA_INSTALL_ERROR } from '@/lib/constants/toast/text/errorText';
import { PWA_DEVICE_WARNIG } from '@/lib/constants/toast/text/warningText';
import usePWA from '@/lib/pwa';

const fadeInVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function PWAInstaller() {
  const { isAppleDevice, handleInstall } = usePWA();

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipad|ipod|android/.test(userAgent);
  }, []);

  const onInstallClick = async () => {
    if (isAppleDevice) {
      toast.warning(PWA_DEVICE_WARNIG);
    } else {
      const installed = await handleInstall();
      if (!installed) toast.error(PWA_INSTALL_ERROR);
    }
  };
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={fadeInVariant}
      className="flex flex-col items-center justify-center pb-[10%]"
    >
      <h2 className="pb-[83px] pt-[502px] text-center text-[40px] font-bold leading-[55px]">
        오늘, 새로운 사람들과 번개처럼 <br />
        빠르게 만나보세요! 🚀
      </h2>
      <Button size="lg" color="filled" onClick={onInstallClick}>
        🌟 홈 화면에 추가
      </Button>
    </motion.section>
  );
}
