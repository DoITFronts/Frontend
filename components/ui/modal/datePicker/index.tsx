import DatePicker from 'react-datepicker';
import CustomInput from './CustomInput';
import CustomTimeInput from './CustomTimeInput';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';

interface DatePickerProps {
  label: string;
  selected: Date;
  onChange: (date: Date | null) => void;
}

export default function CustomDatePicker({ label, selected, onChange }: DatePickerProps) {
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const newDate = new Date(date);
      newDate.setHours(selected.getHours());
      newDate.setMinutes(selected.getMinutes());
      onChange(newDate);
    }
  };

  const handleTimeChange = (date: Date) => {
    onChange(date);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-base font-dunggeunmo text-black-11">{label}</span>
      <DatePicker
        className="w-full"
        calendarClassName="bg-white h-[266px] rounded-xl border border-gray-200 !flex overflow-hidden"
        showPopperArrow={false}
        selected={selected}
        onChange={handleDateChange}
        showTimeInput
        shouldCloseOnSelect={false}
        timeInputLabel=""
        formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
        dateFormat="yyyy-MM-dd h:mm aa"
        customInput={<CustomInput />}
        customTimeInput={
          <CustomTimeInput
            date={selected}
            onTimeChange={handleTimeChange}
            onChange={(timeString: string) => {
              // react-datepicker를 위한 빈 핸들러
              // 실제 시간 변경은 onTimeChange에서 처리됩니다.
            }}
          />
        }
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <div className="w-[250px] py-[5px] px-2.5 justify-between items-center inline-flex">
            <button
              onClick={(e) => {
                e.preventDefault();
                decreaseMonth();
              }}
              className="w-6 h-6 overflow-hidden text-black"
            >
              {'<'}
            </button>
            <div className="text-gray-800 text-sm font-medium font-['Pretendard']">
              {date.toLocaleString('ko', { year: 'numeric', month: 'long' })}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                increaseMonth();
              }}
              className="w-6 h-6 overflow-hidden text-black"
            >
              {'>'}
            </button>
          </div>
        )}
      />
    </div>
  );
}
