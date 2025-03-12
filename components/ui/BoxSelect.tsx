'use client';

import clsx from 'clsx';

import CheckIcon from '@/components/shared/Icons/CheckIcon';

interface BoxSelectProps {
  title: string;
  subtitle: string;
  defaultVariant?: 'dark-sm' | 'light-sm' | 'dark-lg' | 'light-lg';
  onClick?: () => void;
  isChecked?: boolean;
}

export default function BoxSelect({
  title,
  subtitle,
  defaultVariant = 'light-sm',
  onClick,
  isChecked = false,
}: BoxSelectProps) {
  // const [variant, setVariant] = useState(defaultVariant);

  const variant = isChecked
    ? (defaultVariant.replace('light', 'dark') as 'dark-sm' | 'dark-lg')
    : defaultVariant;

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex w-40 flex-col items-start justify-start gap-2.5 overflow-hidden rounded-lg border',
        {
          'bg-gray-900 text-white h-[70px] pl-4 pr-5 pt-3 pb-3.5': variant === 'dark-sm',
          'bg-gray-50 text-gray-900 h-[70px] pl-4 pr-5 pt-3 pb-3.5': variant === 'light-sm',
          'bg-gray-900 text-white h-[76px] pl-2 pr-5 pt-1.5 pb-3.5': variant === 'dark-lg',
          'bg-gray-50 text-gray-900 h-[76px] pl-2 pr-5 pt-1.5 pb-3.5': variant === 'light-lg',
        },
      )}
    >
      <div className="inline-flex items-start justify-start gap-2 self-stretch">
        <div className="flex h-[42px] items-start justify-start gap-2">
          <div className="flex size-6 items-center justify-center p-[3px]">
            <div
              className={clsx('size-[18px] rounded-md', {
                'bg-white': variant.startsWith('dark'),
                'bg-white border border-gray-200': variant.startsWith('light'),
              })}
            >
              {isChecked && <CheckIcon />}
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-0.5">
            <div
              className={clsx("font-['Pretendard'] leading-tight", {
                'text-base font-semibold': variant.includes('sm'),
                'text-sm font-semibold': variant.includes('lg'),
              })}
            >
              {title}
            </div>
            <div
              className={clsx("font-['Pretendard'] text-xs font-medium leading-none", {
                'text-white': variant.startsWith('dark'),
                'text-gray-700': variant.startsWith('light'),
              })}
            >
              {subtitle}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
