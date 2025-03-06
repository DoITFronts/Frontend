function LocationSkeleton() {
  return (
    <div className="w-full rounded-lg bg-white p-6">
      <div className="flex flex-col gap-6">
        <div className="inline-flex h-[373px] w-full items-start justify-start gap-[19px]">
          <div className="h-[373px] w-full animate-pulse rounded-lg bg-gray-300" />
          <div className="inline-flex h-full w-2/6 flex-col items-start justify-start gap-6">
            <div className="h-6 w-48 animate-pulse rounded-md bg-gray-300" />
            <div className="h-5 w-24 animate-pulse rounded-md bg-gray-200" />
            <div className="flex flex-col gap-3">
              <div className="h-4 w-40 animate-pulse rounded-md bg-gray-200" />
              <div className="h-4 w-36 animate-pulse rounded-md bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LocationError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="w-full rounded-lg bg-white p-6">
      <div className="flex flex-col gap-6">
        <div className="flex h-8 w-32 items-center justify-center rounded-md bg-gray-300">
          ⚠️ 번개 위치 로드 실패
        </div>
        <div className="inline-flex h-[373px] w-full items-start justify-start gap-[19px]">
          <div className="flex h-[373px] w-full items-center justify-center rounded-lg bg-gray-200">
            <p className="text-gray-600">⚠️ 지도를 불러올 수 없습니다.</p>
          </div>
          <div className="inline-flex h-full w-2/6 flex-col items-start justify-start gap-6">
            <div className="flex h-6 w-48 items-center justify-center rounded-md bg-gray-300 text-gray-600">
              ⚠️ 주소 정보를 불러올 수 없습니다.
            </div>
            <button
              type="button"
              onClick={onRetry}
              className="h-10 w-1/2 animate-pulse rounded-md bg-gray-300 font-medium text-gray-700"
            >
              다시 시도 🔄
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { LocationSkeleton, LocationError };
