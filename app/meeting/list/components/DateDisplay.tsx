function DateDisplay({ dateTime }: { dateTime: string }) {
  const meetDay = new Date(dateTime).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });

  return (
    <div className="inline-flex h-6 items-center justify-center gap-2.5 overflow-hidden rounded bg-gray-900 px-2 py-0.5">
      <div className="font-['Pretendard'] text-sm font-medium leading-tight text-white">
        {meetDay}
      </div>
    </div>
  );
}

export default DateDisplay;
