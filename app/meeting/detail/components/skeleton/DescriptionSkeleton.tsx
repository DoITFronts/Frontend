function DescriptionSkeleton() {
  return (
    <div className="h-[300px] w-full animate-pulse rounded-lg bg-white p-6">
      <div className="mb-4 h-8 w-3/4 rounded-md bg-gray-300" />
      <div className="mb-2 h-4 w-full rounded-md bg-gray-200" />
      <div className="mb-2 h-4 w-5/6 rounded-md bg-gray-200" />
      <div className="mb-2 h-4 w-3/4 rounded-md bg-gray-200" />
      <div className="h-4 w-2/3 rounded-md bg-gray-200" />
    </div>
  );
}

function DescriptionError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex h-[300px] flex-col items-center justify-center rounded-lg bg-black-3 p-6">
      <p className="mb-4 font-medium text-gray-600">⚠️ 데이터를 불러오는 중 오류가 발생했습니다.</p>
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

export { DescriptionSkeleton, DescriptionError };
