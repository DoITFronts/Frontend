import Card from '@/components/ui/card/Card';
import Tag from '@/components/ui/card/component/Tag';

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
  return (
    <div>
      <div className="flex flex-col gap-2">
        <Tag deadline={datetime} />
        <Card.Title name={title} location={location} />
        <Card.ChipInfo datetime={datetime} />
      </div>
      <div className="line-clamp-2 overflow-hidden text-ellipsis font-['Pretendard'] text-base font-medium text-[#8c8c8c]">
        {summary}
      </div>
    </div>
  );
}
