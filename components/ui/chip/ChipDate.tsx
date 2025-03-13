import { formatDateTime } from '../../../../../../../../Library/Mobile Documents/.Trash/utils/formatDateTime';

interface ChipInfoProps {
  datetime: string;
}

export default function ChipDate({ datetime }: ChipInfoProps) {
  const formattedDateTime = formatDateTime(datetime);

  return (
    <div className="inline-flex h-[22px] w-fit items-center justify-center gap-[4px]">
      <span className="font-pretandard text-base font-semibold leading-snug text-[#bfbfbf]">
        {formattedDateTime}
      </span>
    </div>
  );
}
