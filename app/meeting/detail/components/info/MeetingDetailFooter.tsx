import AvatarGroup from '@/app/meeting/detail/components/AvatarGroup';
import MeetingStatus from '@/components/ui/card/component/MeetingStatus';
import { Participant } from '@/types/meeting';

interface MeetingDetailFooterProps {
  participantCount: number;
  capacity: number;
  participants: Participant[];
}

export default function MeetingDetailFooter({
  participantCount,
  capacity,
  participants,
}: MeetingDetailFooterProps) {
  return (
    <MeetingStatus
      participantCount={participantCount}
      capacity={capacity}
      isConfirmed
      isCompleted={false}
      optionClass="justifycontent: spacebetween"
    >
      <AvatarGroup count={participantCount} participants={participants} />
    </MeetingStatus>
  );
}
