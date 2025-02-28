function ReviewListSkeleton() {
  return (
    <div className="h-[200px] w-full animate-pulse rounded-lg bg-white p-6">
      <div className="mb-4 h-6 w-3/4 rounded-md bg-gray-300" />
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="h-16 w-full rounded-md bg-gray-200" />
        ))}
      </div>
    </div>
  );
}

function ReviewListError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex h-[200px] flex-col items-center justify-center rounded-lg bg-black-3 p-6">
      <p className="mb-4 font-medium text-gray-600">
        ⚠️ 리뷰 데이터를 불러오는 중 오류가 발생했습니다.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-md bg-black px-4 py-2 font-bold text-white hover:bg-black-10"
      >
        다시 시도 🔄
      </button>
    </div>
  );
}

export { ReviewListSkeleton, ReviewListError };
