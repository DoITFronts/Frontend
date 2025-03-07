import AvatarGroup from '@/app/meeting/detail/components/AvatarGroup';
import MeetingProgress from '@/components/ui/card/MeetingProgress';

interface MeetingDetailFooterProps {
  participantCount: number;
  capacity: number;
  participantId: number[];
}

export default function MeetingDetailFooter({
  participantCount,
  capacity,
  participantId,
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
      <AvatarGroup count={participantCount} participantId={participantId} />
    </MeetingProgress>
  );
}
