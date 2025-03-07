function BottomFloatingBarSkeleton() {
  return (
    <div className="fixed bottom-0 left-0 z-[100] flex h-[84px] w-full flex-col flex-wrap items-center justify-center overflow-hidden border-t-2 border-gray-900 bg-white p-5">
      <div className="flex w-full max-w-5xl items-center justify-between">
        <div className="flex w-3/4 flex-col gap-1">
          <div className="h-5 w-48 animate-pulse rounded-md bg-gray-300" />
          <div className="h-4 w-32 animate-pulse rounded-md bg-gray-200" />
        </div>
        <div className="h-10 w-24 animate-pulse rounded-md bg-gray-300" />
      </div>
    </div>
  );
}

function BottomFloatingBarError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 z-[100] flex h-[84px] w-full flex-col flex-wrap items-center justify-center overflow-hidden border-t-2 border-gray-900 bg-white p-5">
      <div className="flex w-full max-w-5xl items-center justify-between">
        <div className="flex w-3/4 flex-col gap-1">
          <div className="text-sm font-semibold text-gray-600">
            ⚠️ 모임 정보를 불러오지 못했습니다.
          </div>
        </div>
        <button
          type="button"
          onClick={onRetry}
          className="h-10 w-24 animate-pulse rounded-md bg-gray-300 font-medium text-gray-700"
        >
          다시 시도 🔄
        </button>
      </div>
    </div>
  );
}

export { BottomFloatingBarSkeleton, BottomFloatingBarError };
