import AvatarGroup from '@/app/meeting/detail/components/AvatarGroup';
import MeetingStatus from '@/components/ui/card/component/MeetingStatus';

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
    <MeetingStatus
      participantCount={participantCount}
      capacity={capacity}
      isConfirmed
      isCompleted={false}
      optionClass="justifycontent: spacebetween"
    >
      <AvatarGroup count={participantCount} participantId={participantId} />
    </MeetingStatus>
  );
}
