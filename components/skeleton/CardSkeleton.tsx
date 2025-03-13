function MeetingCardLoading() {
  return (
    <div className="h-[320px] w-full animate-pulse ">
      {/* 이미지 영역 */}
      <div className="mb-3 h-[160px] w-full rounded-md bg-gray-300" />

      {/* 제목 */}
      <div className="mb-2 h-6 w-3/4 rounded-md bg-gray-300" />

      {/* 유저 정보 */}
      <div className="flex items-center gap-2">
        <div className="size-8 rounded-full bg-gray-300" />
        <div className="h-4 w-1/4 rounded-md bg-gray-200" />
      </div>

      {/* 날짜 및 설명 */}
      <div className="mt-2 h-4 w-1/2 rounded-md bg-gray-100" />

      {/* 참여 인원 */}
      <div className="mt-4 h-6 w-1/2 rounded-md bg-gray-300" />
    </div>
  );
}

function MeetingCardError() {
  return (
    <div className="flex h-[320px] w-full flex-col items-center justify-center rounded-md bg-black-3 p-4">
      <p className="text-sm text-gray-500">데이터를 불러오는 중 문제가 발생했어요.</p>
      <button
        type="button"
        className="mt-3 rounded-md bg-black px-4 py-2 text-white hover:bg-black-10"
        onClick={() => window.location.reload()}
      >
        새로고침 🔄
      </button>
    </div>
  );
}

export { MeetingCardLoading, MeetingCardError };
