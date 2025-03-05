import Card from '../../../list/components/Card';

import Tag from '@/components/ui/Tag';

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
      <Tag />
      <Card.Title name={title} location={location} />
      <Card.ChipInfo datetime={datetime} />
    </div>
  );
}
