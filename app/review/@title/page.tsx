export default function Header() {
  return (
    <div className="flex flex-col items-center justify-between sm:items-start md:flex-row">
      <div className="flex flex-col items-start gap-3">
        <div className="text-start align-middle font-dunggeunmo text-2xl font-normal leading-[100%] tracking-[-0.06em] text-black sm:whitespace-pre-line md:whitespace-normal md:text-3xl">
          모든 리뷰
          <span className="sm:block md:inline"> 누구 없나요?</span>
        </div>
        <div className="text-start align-middle font-pretandard text-base font-normal leading-[100%] tracking-normal text-black md:text-[22px]">
          번개의 모든 리뷰를 살펴보세요 :)
        </div>
      </div>
    </div>
  );
}
