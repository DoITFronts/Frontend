import clsx from 'clsx';

interface ChipProps {
  type: string;
}

const typeStyles: Record<string, string> = {
  술: 'bg-[#ffe6e9] text-[#ff5e76]',
  카페: 'bg-[#fffbe6] text-[#ffd500]',
  보드게임: 'bg-[#d3e8ff] text-[#007aff]',
  맛집: 'bg-[#f0f0f0] text-[#595959]',
};

export default function Category({ type }: ChipProps) {
  return (
    <div
      className={clsx(
        'inline-flex h-8 w-fit items-center justify-center rounded-xl px-3 py-1.5',
        typeStyles[type] || '',
      )}
    >
      <div className="font-pretandard text-sm font-bold leading-tight">{type}</div>
    </div>
  );
}
