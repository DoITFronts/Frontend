function HostInfoSkeleton() {
  return (
    <div className="w-full animate-pulse rounded-lg bg-white p-6">
      <div className="flex flex-col gap-6">
        <div className="h-6 w-48 rounded-md bg-gray-300" />
        <div className="flex items-center gap-3.5">
          <div className="size-[42px] rounded-full bg-gray-300" />
          <div className="flex flex-col gap-2">
            <div className="h-6 w-32 rounded-md bg-gray-300" />
            <div className="h-6 w-48 rounded-md bg-gray-300" />
          </div>
        </div>
        <div className="h-6 w-full rounded-md bg-gray-300" />
      </div>
    </div>
  );
}

function HostInfoError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex w-full flex-col items-center rounded-lg bg-gray-100 p-6">
      <p className="text-gray-600">⚠️ 데이터를 불러오는 중 오류가 발생했습니다.</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-md bg-black px-4 py-2 font-bold text-white hover:bg-gray-800"
      >
        다시 시도 🔄
      </button>
    </div>
  );
}

export { HostInfoSkeleton, HostInfoError };
