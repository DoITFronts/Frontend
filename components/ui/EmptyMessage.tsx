interface EmptyMessageProps {
  firstLine?: string;
  secondLine?: string;
}

export default function EmptyMessage({ firstLine, secondLine }: EmptyMessageProps) {
  return (
    <div className="container mx-auto flex h-screen flex-col items-center justify-center text-center font-['Pretendard'] text-base font-medium leading-snug text-[#c0c1c2]">
      <p>{firstLine}</p>
      <p>{secondLine}</p>
    </div>
  );
}
