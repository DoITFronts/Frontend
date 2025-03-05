'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

function ProgressBar({
  participantCount,
  capacity,
  isCompleted,
}: {
  participantCount: number;
  capacity: number;
  isCompleted: boolean;
}) {
  const progressPercent = Math.min((participantCount / capacity) * 100, 100);
  const { ref, inView } = useInView({
    threshold: 0.1, // 10% 보여질 때 작동
    triggerOnce: false,
  });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (inView) {
      setWidth(0);
      setTimeout(() => {
        setWidth(progressPercent);
      }, 50);
    }
  }, [inView, progressPercent]);

  return (
    <div ref={ref} className="h-1 w-full overflow-hidden rounded-md bg-[#f0f0f0]">
      <div
        key={inView ? 'animate' : 'stop'}
        className={`h-1 rounded-md transition-all duration-700 ease-in-out will-change-transform ${
          isCompleted ? 'bg-[#bfbfbf]' : 'bg-[#ffd500]'
        }`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export default ProgressBar;
