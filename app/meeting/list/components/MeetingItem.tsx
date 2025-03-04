'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { Meeting } from '@/types/meeting.types';

import MeetingInfo from './MeetingInfo';

interface Props {
  meeting: Meeting;
  onClick: () => void;
}

export default function MeetingItem({ meeting, onClick }: Props) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="overflow-hidden rounded-b-2xl hover:shadow-[0px_10px_10px_1px_rgba(0,0,0,0.1)]"
    >
      <MeetingInfo meetings={meeting} onClick={onClick} />
    </motion.div>
  );
}
