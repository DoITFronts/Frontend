import clsx from 'clsx';

interface ChipProps {
  text: string;
  size?: 'sm' | 'lg';
  mode?: 'dark' | 'light';
  type?: 'default' | 'time';
  disabled?: boolean;
}

export default function CategoryFilter({
  text,
  size = 'sm',
  mode = 'light',
  type = 'default',
  disabled = false,
}: ChipProps) {
  const baseClasses = 'inline-flex items-center justify-center w-fit sm:px-3 sm:py-2';
  const sizeClasses = size === 'sm' ? 'h-8 px-3 py-1.5 text-xs' : 'h-10 px-4 py-2.5 text-sm';
  const modeClasses = mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-[#f0f0f0] text-[#595959]';
  const timeModeClasses = mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <div
      className={clsx(
        baseClasses,
        type === 'time' ? 'h-8 rounded-lg px-3 py-1.5' : 'rounded-xl',
        type === 'time' ? timeModeClasses : modeClasses,
        disabled && disabledClasses,
        sizeClasses,
        mode !== 'dark' && 'hover:bg-[#595959] hover:text-white',
      )}
    >
      <div className="font-['Pretendard'] text-sm font-medium leading-tight">{text}</div>
    </div>
  );
}
