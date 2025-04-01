export default function Header() {
  return (
    <div className="flex flex-col items-center justify-between sm:items-start md:flex-row">
      <div className="flex flex-col items-start gap-3">
        <div className="text-start align-middle font-dunggeunmo text-2xl font-normal leading-[100%] tracking-[-0.06em] text-black sm:whitespace-pre-line md:whitespace-normal md:text-3xl">
          찜한 번개를 한 눈에 확인할 수 있어요!
        </div>
        <div className="font-pretandard text-start align-middle text-base font-normal leading-[100%] tracking-normal text-black md:text-[22px]">
          관심 있는 번개를 찜해두면, 번개를 놓치지 않고 참여할 수 있어요
        </div>
      </div>
    </div>
  );
}
