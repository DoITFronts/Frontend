interface StateComponentProps {
  message: string;
  className?: string;
}

export function EmptyMessage({ message, className = "" }: StateComponentProps) {
  return (
    <div
      className={`col-span-1 flex h-[435px] items-center justify-center whitespace-pre-line bg-white md:col-span-2 lg:col-span-3 ${className}`}
    >
      <p className="text-center text-base font-medium text-[#C0C1C2]">
        {message}
      </p>
    </div>
  );
}

export function LoadingState({
  message = "로딩 중...",
  className = "",
}: Partial<StateComponentProps>) {
  return (
    <div
      className={`col-span-1 flex h-[435px] items-center justify-center md:col-span-2 lg:col-span-3 ${className}`}
    >
      <p className="text-center text-base font-medium text-[#C0C1C2]">
        {message}
      </p>
    </div>
  );
}

export function ErrorState({
  message = "데이터를 불러오는데 문제가 발생했습니다.",
  className = "",
}: Partial<StateComponentProps>) {
  return (
    <div
      className={`col-span-1 flex h-[435px] items-center justify-center md:col-span-2 lg:col-span-3 ${className}`}
    >
      <p className="text-center text-base font-medium text-[#C0C1C2]">
        {message}
      </p>
    </div>
  );
}
