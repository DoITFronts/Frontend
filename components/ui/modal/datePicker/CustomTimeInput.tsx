import React, { useRef } from 'react';

interface TimeInputProps {
  value?: string;
  onChange: (time: string) => void;
  date: Date;
  onTimeChange: (date: Date) => void;
}

const formatTimeString = (date: Date) =>
  date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

export default function CustomTimeInput({ date, onTimeChange, value, onChange }: TimeInputProps) {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);

  const currentHour = date.getHours();
  const currentMinute = date.getMinutes();
  const isPm = currentHour >= 12;
  const displayHour = isPm
    ? currentHour === 12
      ? 12
      : currentHour - 12
    : currentHour === 0
      ? 12
      : currentHour;

  const updateTime = (newDate: Date) => {
    onChange(formatTimeString(newDate));
    onTimeChange(newDate);
  };

  const handleHourChange = (hour: number) => {
    if (hoursRef.current) {
      hoursRef.current.scrollTop = 0;
    }

    const newDate = new Date(date);
    const actualHour = isPm ? (hour === 12 ? 12 : hour + 12) : hour === 12 ? 0 : hour;
    newDate.setHours(actualHour);
    updateTime(newDate);
  };

  const handleMinuteChange = (minute: number) => {
    if (minutesRef.current) {
      minutesRef.current.scrollTop = 0;
    }

    const newDate = new Date(date);
    newDate.setMinutes(minute);
    updateTime(newDate);
  };

  const handleAmPmChange = (newIsPm: boolean) => {
    const newDate = new Date(date);
    let newHour = currentHour;
    if (newIsPm && currentHour < 12) {
      newHour += 12;
    } else if (!newIsPm && currentHour >= 12) {
      newHour -= 12;
    }
    newDate.setHours(newHour);
    updateTime(newDate);
  };

  return (
    <div className="flex h-full items-start gap-4">
      {/* 시간 선택 */}
      <div ref={hoursRef} className="flex h-[242px] flex-col overflow-y-scroll">
        <div className="mb-2 flex h-[33px] w-[42px] shrink-0 items-center justify-center rounded-lg bg-black">
          <div className="text-center text-sm font-medium text-white">
            {String(displayHour).padStart(2, '0')}
          </div>
        </div>
        <div className="flex h-auto shrink-0 flex-col gap-2.5">
          {hours.map((hour) => (
            <button
              type="button"
              key={hour}
              onClick={() => handleHourChange(hour)}
              className="flex h-[33px] w-[42px] shrink-0 items-center justify-center rounded-lg hover:bg-gray-50"
            >
              <div className="text-center text-sm font-medium text-gray-900">
                {String(hour).padStart(2, '0')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 세로 구분선 */}
      <div className="my-2 h-full w-px bg-gray-200" />

      {/* 분 선택 */}
      <div ref={minutesRef} className="flex h-[242px] flex-col overflow-y-scroll">
        <div className="mb-2 flex h-[33px] w-[42px] shrink-0 items-center justify-center rounded-lg bg-black">
          <div className="text-center text-sm font-medium text-white">
            {String(currentMinute).padStart(2, '0')}
          </div>
        </div>
        <div className="flex h-auto shrink-0 flex-col gap-2.5">
          {minutes.map((minute) => (
            <button
              type="button"
              key={minute}
              onClick={() => handleMinuteChange(minute)}
              className="flex h-[33px] w-[42px] items-center justify-center rounded-lg hover:bg-gray-50"
            >
              <div className="text-center text-sm font-medium text-gray-900">
                {String(minute).padStart(2, '0')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 세로 구분선 */}
      <div className="my-2 h-full w-px bg-gray-200" />

      {/* AM/PM 선택 */}
      <div className="flex flex-col">
        <div className="mb-2 flex h-[33px] w-[42px] items-center justify-center rounded-lg bg-black">
          <div className="text-center text-sm font-medium text-white">{isPm ? 'PM' : 'AM'}</div>
        </div>
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => handleAmPmChange(false)}
            className="flex h-[33px] w-[42px] items-center justify-center rounded-lg hover:bg-gray-50"
          >
            <div className="text-center text-sm font-medium text-gray-900">AM</div>
          </button>
          <button
            type="button"
            onClick={() => handleAmPmChange(true)}
            className="flex h-[33px] w-[42px] items-center justify-center rounded-lg hover:bg-gray-50"
          >
            <div className="text-center text-sm font-medium text-gray-900">PM</div>
          </button>
        </div>
      </div>
    </div>
  );
}
