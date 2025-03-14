import { MeetingCardLoading } from './MeetingCardSkeleton';

export function GridSkeleton() {
  return (
    <>
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <div key={`skeleton-${index}`} className="col-span-1">
            <MeetingCardLoading />
          </div>
        ))}
    </>
  );
}
