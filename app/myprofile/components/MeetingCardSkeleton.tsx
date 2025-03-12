export function MeetingCardLoading() {
  return (
    <div className="h-[430px] w-full animate-pulse overflow-hidden rounded-lg bg-white shadow">
      {/* 이미지 영역 */}
      <div className="h-[200px] w-full bg-gray-200" />

      {/* 텍스트 영역 */}
      <div className="space-y-4 p-4">
        {/* 제목 */}
        <div className="h-6 w-3/4 rounded bg-gray-200" />

        {/* 위치 */}
        <div className="h-4 w-1/2 rounded bg-gray-100" />

        {/* 요약 */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-5/6 rounded bg-gray-100" />
        </div>

        {/* 하단 정보 */}
        <div className="mt-6 flex items-center justify-between">
          <div className="h-8 w-1/3 rounded bg-gray-200" />
          <div className="h-10 w-1/4 rounded-lg bg-gray-300" />
        </div>
      </div>

      {/* 애니메이션 효과 */}
      <div className="skeleton-shine absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

export function MeetingCardError() {
  return (
    <div className="col-span-3 flex h-[200px] w-full flex-col items-center justify-center rounded-lg bg-red-50 p-4 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4 size-12 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <p className="text-lg font-medium text-red-800">데이터를 불러오는 중 문제가 발생했어요.</p>
      <button
        type="button"
        className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
        onClick={() => window.location.reload()}
      >
        새로고침 🔄
      </button>
    </div>
  );
}
