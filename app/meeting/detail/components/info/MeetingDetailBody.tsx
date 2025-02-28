interface MeetingDetailBodyProps {
  summary: string;
}

export default function MeetingDetailBody({ summary }: MeetingDetailBodyProps) {
  return (
    <div className="line-clamp-2 overflow-hidden text-ellipsis font-['Pretendard'] text-base font-medium text-[#8c8c8c]">
      {summary}
    </div>
  );
}
