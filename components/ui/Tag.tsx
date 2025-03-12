import { differenceInDays } from 'date-fns';
import { useEffect, useState } from 'react';

interface TagProps {
  deadline: string;
}

export default function Tag({ deadline }: TagProps) {
  const [tagText, setTagText] = useState<string>('오늘 마감!');

  useEffect(() => {
    const now = new Date();
    const endDate = new Date(deadline);
    const daysLeft = differenceInDays(endDate, now);

    if (daysLeft < 0) {
      setTagText('마감 종료');
    } else if (daysLeft === 0) {
      setTagText('오늘 마감!');
    } else {
      setTagText(`${daysLeft}일 후 마감!`);
    }
  }, [deadline]);

  return (
    <div className="inline-flex h-[28px] w-fit items-center justify-center gap-[10px] overflow-hidden rounded-[24px] bg-[#ff5e76] px-[10px] py-[4px]">
      <div className="flex items-center gap-[4px]">
        <div className="relative">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 6V8.66667L9.33333 10M12 2L14 4M2 4L4 2M13.3333 8.66667C13.3333 11.6122 10.9455 14 8 14C5.05448 14 2.66667 11.6122 2.66667 8.66667C2.66667 5.72115 5.05448 3.33333 8 3.33333C10.9455 3.33333 13.3333 5.72115 13.3333 8.66667Z"
              stroke="white"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="font-pretendard text-[12px] leading-[20px] text-white">{tagText}</div>
      </div>
    </div>
  );
}
