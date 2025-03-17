"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";

interface ConfettiEffectProps {
  isActive: boolean;
}

export default function ConfettiEffect({ isActive }: ConfettiEffectProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (!isActive) return null;

  return (
    <Confetti
      width={windowSize.width}
      height={windowSize.height}
      numberOfPieces={1500} // 컨페티 개수
      gravity={0.1} // 컨패티가 떨어지는 속도
      recycle={false} // 한 번만 실행
    />
  );
}
