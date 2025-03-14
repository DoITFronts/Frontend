'use client';

import Image from 'next/image';
import { forwardRef } from 'react';

import calendar from '../../../../../../../../../Library/Mobile Documents/.Trash/public/calendar.svg';

const CustomInput = forwardRef(({ value, onClick }: any, ref) => (
  <div
    tabIndex={0}
    role="button"
    onKeyDown={(e) => {
      if (e.key === 'Enter') onClick();
    }}
    className="flex size-auto justify-between rounded-[12px] bg-gray-50 px-4 py-2.5"
    onClick={onClick}
  >
    <Image src={calendar} width={18} height={20} alt="캘린더" />
    <span className="text-gray-400">{value}</span>
  </div>
));

export default CustomInput;
