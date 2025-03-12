'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import calendar from '@/public/calendar.svg';

const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
  <div
    className="w-auto h-auto px-4 py-2.5 bg-gray-50 flex justify-between rounded-[12px]"
    onClick={onClick}
  >
    <Image src={calendar} width={18} height={20} alt="캘린더" />
    <span className="text-gray-400">{value}</span>
  </div>
));

export default CustomInput;
