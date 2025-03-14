import { useState } from 'react';

import Card from '@/components/ui/card/Card';
import Tag from '@/components/ui/card/component/Tag';
import Icon from '@/components/utils/Icon';

interface MeetingDetailHeaderProps {
  title: string;
  location: string;
  datetime: string;
  summary: string;
}

export default function MeetingDetailHeader({
  title,
  location,
  datetime,
  summary,
}: MeetingDetailHeaderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Tag deadline={datetime} />
          <div className="flex min-w-[130px] items-center justify-start lg:hidden">
            <Icon path="/card/location-marker" />
            <div className="font-['Pretendard'] text-base font-semibold leading-snug text-[#595959]">
              {location}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center gap-1.5 font-['Pretendard'] text-2xl font-semibold text-black">
          <div className="w-full whitespace-normal break-words text-2xl font-bold text-black">
            {title}
          </div>
          <div className="hidden min-w-[130px] items-center justify-start lg:flex">
            <Icon path="/card/location-marker" />
            <div className="font-['Pretendard'] text-base font-semibold leading-snug text-[#595959]">
              {location}
            </div>
          </div>
        </div>
        <Card.ChipInfo datetime={datetime} />
      </div>
      <div
        className={`text-base font-medium text-[#8c8c8c] ${isExpanded ? '' : 'line-clamp-3 overflow-hidden'}`}
      >
        {summary}
      </div>
      {summary.length > 100 && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-blue-500 hover:underline"
        >
          {isExpanded ? '접기' : '...더보기'}
        </button>
      )}
    </div>
  );
}
