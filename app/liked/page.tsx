export default function Liked() {
  return (
    <div className="container mx-auto mt-[72px] max-w-[1200px] px-4">
      {/* 제목 */}
      <div className="mb-[52px] flex items-center justify-between">
        <div className="inline-flex h-[68px] flex-col items-start justify-start gap-[9px]">
          <div className="text-center font-dunggeunmo text-3xl font-normal text-black">
            찜한 번개를 한 눈에 확인할 수 있어요!
          </div>
          <div className="text-center font-pretandard text-2xl font-normal text-black">
            관심 있는 번개를 찜해두면, 번개를 놓치지 않고 참여할 수 있어요
          </div>
        </div>
      </div>
    </div>
  );
}
