export default function ReviewSkeleton() {
  return (
    <div className="flex w-full animate-pulse flex-col gap-4 rounded-lg shadow-sm md:flex-row">
      {/* 이미지 영역 */}
      <div className="h-[200px] w-[384px] rounded-md bg-gray-200" />

      {/* 텍스트 & 정보 영역 */}
      <div className="flex flex-1 flex-col">
        {/* 제목 */}
        <div className="mb-2 h-5 w-1/3 rounded-md bg-gray-200" />

        {/* 설명 */}
        <div className="mb-1 h-4 w-full rounded-md bg-gray-200" />
        <div className="mb-1 h-4 w-5/6 rounded-md bg-gray-200" />

        {/* 위치 & 태그 */}
        <div className="mt-2 flex items-center gap-2">
          <div className="h-5 w-12 rounded-md bg-gray-200" />
          <div className="h-5 w-20 rounded-md bg-gray-200" />
        </div>

        {/* 시간 */}
        <div className="mt-2 h-4 w-1/3 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}
