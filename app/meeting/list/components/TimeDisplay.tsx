function TimeDisplay({ dateTime }: { dateTime: string }) {
  const meetDay = new Date(dateTime).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className="flex h-6 items-center justify-center gap-2.5 overflow-hidden rounded bg-gray-900 px-2 py-0.5">
      <div className="font-['Pretendard'] text-sm font-medium leading-tight text-orange-600">
        {meetDay}
      </div>
    </div>
  );
}

export default TimeDisplay;
