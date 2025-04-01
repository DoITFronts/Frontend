interface InfiniteScrollLoaderProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  loadMoreRef: (node?: Element | null) => void;
}

export default function InfiniteScrollLoader({
  hasNextPage,
  isFetchingNextPage,
  loadMoreRef,
}: InfiniteScrollLoaderProps) {
  if (!hasNextPage) {
    return null;
  }

  return (
    <div
      ref={loadMoreRef}
      className="col-span-1 my-4 flex justify-center md:col-span-2 lg:col-span-3"
    >
      {isFetchingNextPage ? <p>더 불러오는 중...</p> : ""}
    </div>
  );
}
