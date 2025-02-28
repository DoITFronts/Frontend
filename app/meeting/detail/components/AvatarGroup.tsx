import ProfileIcon from '@/components/shared/BaseProfile';

interface AvatarGroupProps {
  count: number;
  maxCount?: number;
  theme?: 'light' | 'dark';
}

function AvatarGroup({ count, maxCount = 4, theme = 'light' }: AvatarGroupProps) {
  const visibleIcons = Math.min(count, maxCount);
  const remaining = count - maxCount;
  const showMore = count > maxCount;

  return (
    <div className="flex h-[60px] items-center space-x-[-5px]">
      {Array.from({ length: visibleIcons }, (_, i) => (
        <ProfileIcon key={i} theme={theme} />
      ))}

      {showMore && (
        <div className="flex size-[30px] items-center justify-center rounded-full bg-[#f0f0f0]">
          <span className="text-center text-[10px] font-bold leading-tight text-[#595959]">
            +{remaining}
          </span>
        </div>
      )}
    </div>
  );
}

export default AvatarGroup;
