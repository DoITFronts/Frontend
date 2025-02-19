import { formatDateTime } from '@/utils/formatDateTime';

interface ChipInfoProps {
  datetime: string;
}

export default function ChipInfo({ datetime }: ChipInfoProps) {
  const formattedDateTime = formatDateTime(datetime);

  return (
    <div className="inline-flex h-[22px] w-fit items-center justify-center gap-[4px]">
      <span className="font-pretendard text-[16px] font-semibold leading-[22px] text-[#BFBFBF]">
        {formattedDateTime}
      </span>
    </div>
  );
}
