import { motion } from 'framer-motion';
import { useState } from 'react';

import ProfileIcon from '@/components/utils/BaseProfile';
import { Participant } from '@/types/meeting';

interface AvatarGroupProps {
  count: number;
  maxCount?: number;
  participants: Participant[];
}

const profileVariants = {
  hover: { scale: 1.15, transition: { duration: 0.2 } },
};

const tooltipVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
};

const moreVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

function AvatarGroup({ count, maxCount = 4, participants = [] }: AvatarGroupProps) {
  const visibleIcons = Math.min(count, maxCount);
  const remaining = count - maxCount;
  const showMore = count > maxCount;
  const [hoveredUser, setHoveredUser] = useState<Participant | null>(null);

  return (
    <div className="relative flex h-[60px] items-center space-x-[-5px]">
      {participants.slice(0, visibleIcons).map((participant) => (
        <motion.div
          key={participant.userId}
          className="relative overflow-hidden rounded-full"
          variants={profileVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          onMouseEnter={() => setHoveredUser(participant)}
          onMouseLeave={() => setHoveredUser(null)}
        >
          <ProfileIcon id={participant.userId} />
          {hoveredUser?.userId === participant.userId && (
            <motion.div
              className="absolute bottom-[110%] left-1/2 z-10 w-[180px] -translate-x-1/2 rounded-md bg-white p-2 shadow-md"
              variants={tooltipVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
              <div className="flex flex-col items-center">
                <p className="text-sm font-semibold text-black">{hoveredUser.name}</p>
                <p className="text-xs text-gray-500">{hoveredUser.description}</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}

      {showMore && (
        <motion.div
          className="flex size-[30px] items-center justify-center rounded-full bg-[#f0f0f0]"
          variants={moreVariants}
          initial="hidden"
          whileInView="visible"
        >
          <span className="text-center text-[10px] font-bold leading-tight text-[#595959]">
            +{remaining}
          </span>
        </motion.div>
      )}
    </div>
  );
}

export default AvatarGroup;
