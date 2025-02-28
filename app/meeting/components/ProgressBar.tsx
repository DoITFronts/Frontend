function ProgressBar({
  participantCount,
  capacity,
  isCompleted,
}: {
  participantCount: number;
  capacity: number;
  isCompleted: boolean;
}) {
  const progressPercent = Math.min((participantCount / capacity) * 100, 100);

  return (
    <div className="h-1 w-full overflow-hidden rounded-md bg-[#f0f0f0]">
      <div
        className={`h-1 rounded-md ${isCompleted ? 'bg-[#bfbfbf]' : 'bg-[#ffd500]'}`}
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  );
}

export default ProgressBar;
