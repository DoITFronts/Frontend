'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SplashScreen({ onCompleteAction }: { onCompleteAction: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onCompleteAction(); // 부모 컴포넌트에서 실행할 함수
    }, 2500);

    return () => clearTimeout(timer);
  }, [onCompleteAction]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-9 bg-black">
      <motion.div
        initial={{ y: 0, scale: 1 }}
        animate={{
          y: [0, -30, 10, -20, 5, -10, 0],
          scale: [1, 1.15, 1, 1.1, 1, 1.05, 1],
        }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          times: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1],
        }}
      >
        <Image src="/assets/logo/splash.svg" alt="Splash" width={76} height={60} />
      </motion.div>
    </div>
  );
}
