import { motion } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type ButtonSize = 'sm' | 'lg';
type ButtonColor = 'filled' | 'white';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  color?: ButtonColor;
}

const baseStyle =
  "cursor-pointer flex items-center justify-center rounded-xl font-semibold font-['Pretendard'] overflow-hidden gap-2.5 text-center transition-all";

const styleByColor: Record<ButtonColor, string> = {
  filled: 'text-white bg-black hover:bg-black-11 active:bg-black-8 disabled:bg-black-6',
  white:
    'bg-white border border-black text-black hover:border-black-11 hover:text-black-11 active:border-black-8 active:text-black-8 disabled:border-black-6 disabled:text-black-6',
};

export default function Button({
  children,
  className = '',
  type = 'button',
  form,
  onClick,
  disabled = false,
  size = 'sm',
  color = 'filled',
}: ButtonProps) {
  const buttonStyle = twMerge(
    baseStyle,
    styleByColor[color],
    size === 'sm' ? 'text-sm w-[120px] h-10' : 'text-base w-[332px] h-11',
    className,
  );

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' },
    tap: { scale: 0.95 },
  };

  return (
    <motion.button
      className={buttonStyle}
      type={type}
      form={form}
      onClick={onClick}
      disabled={disabled}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
    >
      {children}
    </motion.button>
  );
}
