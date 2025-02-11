import clsx from 'clsx';

interface TagProps {
  text: string;
  variant?: 'left-rounded' | 'right-rounded';
}

export default function Tag({ text, variant = 'left-rounded' }: TagProps) {
  return (
    <div
      className={clsx(
        'inline-flex h-8 w-fit min-w-max flex-col items-start justify-start bg-orange-600 py-1 pl-2',
        variant === 'left-rounded' && 'rounded-bl-xl pr-2.5',
        variant === 'right-rounded' && 'rounded-bl-xl rounded-tr-[22px] pr-4',
      )}
    >
      <div className="inline-flex items-center justify-start gap-1">
        <div className="flex size-6 items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.66667 5L5 6.66667"
              stroke="white"
              strokeWidth="1.66667"
              strokeLinecap="round"
            />
            <path
              d="M18.3333 5L20 6.66667"
              stroke="white"
              strokeWidth="1.66667"
              strokeLinecap="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.4997 18.3333C16.1816 18.3333 19.1663 15.3486 19.1663 11.6667C19.1663 7.98477 16.1816 5 12.4997 5C8.81778 5 5.83301 7.98477 5.83301 11.6667C5.83301 15.3486 8.81778 18.3333 12.4997 18.3333ZM14.8176 10.1037C15.1051 9.74427 15.0468 9.21986 14.6874 8.93235C14.3281 8.64484 13.8036 8.70311 13.5161 9.0625L12.3267 10.5492L10.4624 9.30637C10.0795 9.05107 9.56211 9.15455 9.30682 9.53749C9.05152 9.92043 9.155 10.4378 9.53794 10.6931L11.879 12.2538C12.3286 12.5535 12.9327 12.4598 13.2702 12.0378L14.8176 10.1037Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="font-['Pretendard'] text-xs font-medium leading-none text-white">
          {text}
        </div>
      </div>
    </div>
  );
}
