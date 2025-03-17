import { motion } from "framer-motion";
import { useState } from "react";

import ProfileIcon from "@/components/utils/BaseProfile";
import { Participant } from "@/types/meeting/meeting";

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
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const moreVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function AvatarGroup({
  count,
  maxCount = 4,
  participants = [],
}: AvatarGroupProps) {
  const visibleIcons = Math.min(count, maxCount);
  const remaining = count - maxCount;
  const showMore = count > maxCount;
  const [hoveredUser, setHoveredUser] = useState<Participant | null>(null);

  return (
    <div className="relative flex h-[60px] items-center space-x-[-5px]">
      {participants.slice(0, visibleIcons).map((participant) => (
        <motion.div
          key={participant.userId}
          className="relative z-50"
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
              key={participant.userId}
              className="relative"
              variants={profileVariants}
              initial="hidden"
              animate="visible"
            >
              {hoveredUser?.userId === participant.userId && (
                <div className="relative">
                  <div className="absolute left-1/2 top-full mt-2 min-w-[150px] -translate-x-1/2">
                    <div className="border-2-gray flex flex-col items-center justify-center gap-2 rounded-xl border bg-white p-3 shadow-md">
                      <p className="min-w-max font-pretendard text-sm font-bold text-black">
                        {hoveredUser.name}
                      </p>
                      <p className="line-clamp-3 break-words font-pretendard text-xs text-gray-500">
                        {hoveredUser.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
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
