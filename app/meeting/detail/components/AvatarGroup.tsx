import { motion } from 'framer-motion';
import ProfileIcon from '@/components/shared/BaseProfile';

interface AvatarGroupProps {
  count: number;
  maxCount?: number;
  participantId?: number[];
}

const profileVariants = {
  hover: { y: [-2, 2, -2], transition: { duration: 0.4, repeat: Infinity } },
};

const avatarVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

const moreVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

function AvatarGroup({ count, maxCount = 4, participantId = [] }: AvatarGroupProps) {
  const visibleIcons = Math.min(count, maxCount);
  const remaining = count - maxCount;
  const showMore = count > maxCount;

  return (
    <div className="flex h-[60px] items-center space-x-[-5px]">
      {Array.from({ length: visibleIcons }, (_, i) => (
        <motion.div
          key={i}
          className="rounded-full overflow-hidden"
          variants={avatarVariants}
          initial="hidden"
          whileInView="visible"
        >
          <motion.div whileHover="hover" variants={profileVariants}>
            <ProfileIcon id={participantId[i] || i} />
          </motion.div>
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