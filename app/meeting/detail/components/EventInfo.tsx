import ChipInfo from '@/components/ui/chip/ChipInfo';
import Tag from '@/components/ui/Tag';

export default function EventInfo({
  title,
  location,
  datetime,
}: {
  title: string;
  location: string;
  datetime: string;
}) {
  return (
    <div className="flex h-[215px] flex-col gap-2.5">
      <Tag text="12시 마감" />
      <div className="flex flex-col items-start gap-2">
        <div className="inline-flex h-[29px] items-center justify-center gap-1.5">
          <div className="font-['Pretendard'] text-2xl font-bold text-black">{title}</div>
          <div className="inline-flex h-6 items-start justify-start">
            <div data-svg-wrapper="" className="relative">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.2427 15.8429L13.0605 19.0563C12.9213 19.1969 12.7561 19.3085 12.5742 19.3847C12.3923 19.4608 12.1973 19.5 12.0004 19.5C11.8035 19.5 11.6085 19.4608 11.4266 19.3847C11.2447 19.3085 11.0794 19.1969 10.9403 19.0563L7.75725 15.8429C6.91817 14.9955 6.34675 13.9159 6.11527 12.7407C5.88378 11.5654 6.00262 10.3472 6.45675 9.24011C6.91089 8.13303 7.67992 7.1868 8.66661 6.52106C9.6533 5.85533 10.8133 5.5 12 5.5C13.1867 5.5 14.3467 5.85533 15.3334 6.52106C16.3201 7.1868 17.0891 8.13303 17.5432 9.24011C17.9974 10.3472 18.1162 11.5654 17.8847 12.7407C17.6532 13.9159 17.0818 14.9955 16.2427 15.8429Z"
                  fill="#595959"
                />
                <path
                  d="M13.4142 12.9142C13.7893 12.5391 14 12.0304 14 11.5C14 10.9696 13.7893 10.4609 13.4142 10.0858C13.0391 9.71071 12.5304 9.5 12 9.5C11.4696 9.5 10.9609 9.71071 10.5858 10.0858C10.2107 10.4609 10 10.9696 10 11.5C10 12.0304 10.2107 12.5391 10.5858 12.9142C10.9609 13.2893 11.4696 13.5 12 13.5C12.5304 13.5 13.0391 13.2893 13.4142 12.9142Z"
                  fill="#fdfdfd"
                />
              </svg>
            </div>
            <div className="font-['Pretendard'] text-base font-semibold leading-snug text-[#595959]">
              {location}
            </div>
          </div>
        </div>
        <ChipInfo datetime={datetime} />
      </div>
      <div className="font-['Pretendard'] text-base font-medium leading-snug text-[#8c8c8c]">
        혼자 하면 집중 안 되고 자꾸 딴짓하게 되는데, 같이 하면 의욕도 생기고 덜 지루하지 않나요?
        공부든, 작업이든, 독서든 다 좋아요. 중간중간 가벼운 대화도 환영! 우리 같이 카공해요~
      </div>
    </div>
  );
}
