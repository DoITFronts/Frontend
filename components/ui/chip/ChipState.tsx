import clsx from 'clsx';

import CheckIcon from '@/components/shared/Icons/CheckIcon';

interface ChipStatusProps {
  text: string;
  status: 'planned' | 'completed' | 'confirmed' | 'waiting';
}

export default function ChipStatus({ text, status }: ChipStatusProps) {
  return (
    <div
      className={clsx(
        'inline-flex h-8 w-fit min-w-max items-center justify-center gap-2.5 rounded-3xl px-3 py-1.5',
        {
          planned: 'bg-orange-100 text-orange-600',
          completed: 'bg-gray-200 text-gray-500',
          confirmed: 'bg-white border border-orange-100 text-orange-500',
          waiting: 'bg-white border border-gray-200 text-gray-500',
        }[status],
      )}
    >
      <div className="flex items-center justify-start gap-1">
        {status === 'confirmed' && (
          <div className="flex size-4 items-center justify-center overflow-hidden pb-[5.67px] pl-1 pr-[3.58px] pt-[5px]">
            <CheckIcon />
          </div>
        )}
        <div className="font-['Pretendard'] text-sm font-medium leading-tight">{text}</div>
      </div>
    </div>
  );
}
