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
        className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-9 bg-black"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <Image src="/assets/logo/splash.svg" alt="Splash" width={76} height={60} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
