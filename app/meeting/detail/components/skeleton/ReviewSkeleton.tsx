function ReviewListSkeleton() {
  return (
    <div className="h-[200px] w-full animate-pulse rounded-lg bg-white p-6">
      <div className="mb-4 h-6 w-3/4 rounded-md bg-gray-300" />
      <div className="space-y-4">
        <div className="h-16 w-full rounded-md bg-gray-200" />
        <div className="h-16 w-full rounded-md bg-gray-200" />
        <div className="h-16 w-full rounded-md bg-gray-200" />
        <div className="h-16 w-full rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

function ReviewListError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="h-[200px] w-full rounded-lg bg-white p-6">
      <div className="flex h-full flex-col justify-between">
        <div className="flex h-10 w-3/4 items-center justify-center rounded-md bg-gray-300 text-gray-600">
          ⚠️ 리뷰 데이터를 불러오는 중 오류가 발생했습니다.
        </div>
        <button
          type="button"
          onClick={onRetry}
          className="h-10 w-1/3 animate-pulse rounded-md bg-gray-300 font-medium text-gray-700"
        >
          다시 시도 🔄
        </button>
      </div>
    </div>
  );
}

export { ReviewListSkeleton, ReviewListError };
