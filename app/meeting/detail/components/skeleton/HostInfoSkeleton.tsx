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
    <div className="w-full rounded-lg bg-white p-6">
      <div className="flex flex-col gap-6">
        <div className="flex h-12 w-full items-center justify-center rounded-md bg-gray-300 text-gray-600">
          ⚠️ 데이터를 불러오는 중 오류가 발생했습니다.
        </div>
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 h-10 w-full animate-pulse rounded-md bg-black px-4 py-2 font-bold text-white hover:bg-black-10"
        >
          다시 시도 🔄
        </button>
      </div>
    </div>
  );
}

export { HostInfoSkeleton, HostInfoError };
