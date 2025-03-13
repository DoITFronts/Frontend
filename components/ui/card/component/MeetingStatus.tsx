import Card from '@/components/ui/card/Card';

interface MeetingStatusProps {
  participantCount: number;
  capacity: number;
  isConfirmed: boolean;
  isCompleted: boolean;
  children?: React.ReactNode;
  optionClass?: string;
}

export default function MeetingStatus({
  participantCount,
  capacity,
  isConfirmed,
  isCompleted,
  children,
  optionClass,
}: MeetingStatusProps) {
  return (
    <div className="flex w-full flex-row items-center">
      <div className="flex grow flex-col gap-3">
        <div className={`${optionClass} flex items-center gap-2`}>
          <div className="flex flex-row gap-2">
            <Card.Participant participantCount={participantCount} capacity={capacity} />
            {children}
          </div>
          <Card.ConfirmedStatus isConfirmed={isConfirmed && !isCompleted} />
        </div>
        <Card.ProgressBar
          participantCount={participantCount}
          capacity={capacity}
          isCompleted={isCompleted}
        />
      </div>
    </div>
  );
}
