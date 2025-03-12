import Button from '@/components/ui/button/Button';

export default function LoginCheckModal() {
  return (
    <div className="inline-flex h-[222px] w-[432px] flex-col items-start justify-start gap-2.5 rounded-xl bg-white px-20 py-[30px]">
      <div className="flex h-[162px] flex-col items-center justify-start gap-10 self-stretch">
        <div className="flex h-[78px] flex-col items-end justify-start gap-2.5 self-stretch">
          <div data-svg-wrapper="">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 5L19.5 19.5" stroke="#F0F0F0" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M19.5 5L5 19.5" stroke="#F0F0F0" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex h-11 flex-col items-center justify-center gap-2.5 self-stretch">
            <div className="self-stretch text-center font-['Pretendard'] text-base font-semibold leading-snug text-black">
              번개에 참여하려면
              <br />
              로그인이 필요해요.
            </div>
          </div>
        </div>
        <div className="inline-flex items-start justify-center gap-2.5 self-stretch">
          <Button
            color="filled"
            type="button"
            onClick={() => {
              window.location.href = '/user/signin';
            }}
          >
            로그인하기
          </Button>
        </div>
      </div>
    </div>
  );
}
