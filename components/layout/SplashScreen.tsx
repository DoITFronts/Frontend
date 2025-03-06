'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';

export default function SplashScreen({ onCompleteAction }: { onCompleteAction: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onCompleteAction();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onCompleteAction]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 1 }}
      >
        {/* ✅ 스플래쉬 이미지 */}
        <Image src="/splash.png" alt="Splash" width={300} height={300} />

        {/* ✅ 텍스트 애니메이션 */}
        <motion.p
          className="mt-4 text-2xl font-bold text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          즉흥적인 만남은 <span className="text-yellow-400">여기서 시작!</span>
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
