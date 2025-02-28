function MeetingDetailSkeleton() {
  return (
    <div className="w-full animate-pulse rounded-lg bg-white p-6 ">
      <div className="flex h-[271px] gap-6">
        <div className="relative flex w-[518px] items-center justify-center rounded-lg bg-gray-200" />
        <div className="flex h-[271px] w-[calc(100%-518px)] flex-col justify-between">
          <div className="flex flex-col gap-[10px]">
            <div className="h-6 w-24 rounded-md bg-gray-300" />
            <div className="h-8 w-48 rounded-md bg-gray-300" />
            <div className="h-6 w-32 rounded-md bg-gray-300" />
          </div>
          <div className="h-6 w-full rounded-md bg-gray-300" />
        </div>
      </div>
    </div>
  );
}

function MeetingDetailError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex w-full flex-col items-center rounded-lg bg-black-3 p-6">
      <div className="flex h-[271px] w-full gap-6">
        <div className="flex h-[271px] w-[518px] items-center justify-center rounded-md bg-gray-200">
          <p className="text-gray-500">⚠️ 이미지 로딩 실패</p>
        </div>
        <div className="flex h-[271px] w-[calc(100%-518px)] flex-col justify-between">
          <p className="mt-4 font-medium text-gray-600">
            ⚠️ 데이터를 불러오는 중 오류가 발생했습니다.
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 rounded-md bg-black px-4 py-2 font-bold text-white hover:bg-black-10"
          >
            다시 시도 🔄
          </button>
        </div>
      </div>
    </div>
  );
}

export { MeetingDetailSkeleton, MeetingDetailError };
