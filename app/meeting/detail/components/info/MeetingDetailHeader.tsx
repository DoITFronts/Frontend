import Tag from '@/components/ui/Tag';

import Card from '../../../list/components/Card';

interface MeetingDetailHeaderProps {
  title: string;
  location: string;
  datetime: string;
}

export default function MeetingDetailHeader({
  title,
  location,
  datetime,
}: MeetingDetailHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <Tag deadline={datetime} />
      <Card.Title name={title} location={location} />
      <Card.ChipInfo datetime={datetime} />
    </div>
  );
}
