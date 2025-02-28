import AvatarGroup from '@/app/meeting/detail/components/AvatarGroup';
import MeetingProgress from '@/components/ui/card/MeetingProgress';

interface MeetingDetailFooterProps {
  participantCount: number;
  capacity: number;
}

export default function MeetingDetailFooter({
  participantCount,
  capacity,
}: MeetingDetailFooterProps) {
  return (
    <MeetingProgress
      id="1"
      participantCount={participantCount}
      capacity={capacity}
      isConfirmed
      isCompleted={false}
      optionClass="justifycontent: spacebetween"
    >
      <AvatarGroup count={participantCount} />
    </MeetingProgress>
  );
}
