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
    <div className="flex items-start gap-4 h-full">
      {/* 시간 선택 */}
      <div ref={hoursRef} className="flex flex-col h-[242px] overflow-y-scroll">
        <div className="w-[42px] h-[33px] bg-black rounded-lg mb-2 flex justify-center items-center flex-shrink-0">
          <div className="text-center text-white text-sm font-medium">
            {String(displayHour).padStart(2, '0')}
          </div>
        </div>
        <div className="flex flex-col gap-2.5 h-auto flex-shrink-0">
          {hours.map((hour) => (
            <button
              type="button"
              key={hour}
              onClick={() => handleHourChange(hour)}
              className="w-[42px] h-[33px] rounded-lg flex justify-center items-center flex-shrink-0 hover:bg-gray-50"
            >
              <div className="text-center text-gray-900 text-sm font-medium">
                {String(hour).padStart(2, '0')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 세로 구분선 */}
      <div className="w-[1px] h-full bg-gray-200 my-2" />

      {/* 분 선택 */}
      <div ref={minutesRef} className="flex flex-col h-[242px] overflow-y-scroll">
        <div className="w-[42px] h-[33px] bg-black rounded-lg mb-2 flex justify-center items-center flex-shrink-0">
          <div className="text-center text-white text-sm font-medium">
            {String(currentMinute).padStart(2, '0')}
          </div>
        </div>
        <div className="flex flex-col gap-2.5 h-auto flex-shrink-0">
          {minutes.map((minute) => (
            <button
              type="button"
              key={minute}
              onClick={() => handleMinuteChange(minute)}
              className="w-[42px] h-[33px] rounded-lg flex justify-center items-center hover:bg-gray-50"
            >
              <div className="text-center text-gray-900 text-sm font-medium">
                {String(minute).padStart(2, '0')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 세로 구분선 */}
      <div className="w-[1px] h-full bg-gray-200 my-2" />

      {/* AM/PM 선택 */}
      <div className="flex flex-col">
        <div className="w-[42px] h-[33px] bg-black rounded-lg mb-2 flex justify-center items-center">
          <div className="text-center text-white text-sm font-medium">{isPm ? 'PM' : 'AM'}</div>
        </div>
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => handleAmPmChange(false)}
            className="w-[42px] h-[33px] rounded-lg flex justify-center items-center hover:bg-gray-50"
          >
            <div className="text-center text-gray-900 text-sm font-medium">AM</div>
          </button>
          <button
            type="button"
            onClick={() => handleAmPmChange(true)}
            className="w-[42px] h-[33px] rounded-lg flex justify-center items-center hover:bg-gray-50"
          >
            <div className="text-center text-gray-900 text-sm font-medium">PM</div>
          </button>
        </div>
      </div>
    </div>
  );
}
