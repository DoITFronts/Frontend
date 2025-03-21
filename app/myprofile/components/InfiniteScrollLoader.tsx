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
    <div ref={loadMoreRef} className="my-4 flex justify-center">
      {isFetchingNextPage ? <p>더 불러오는 중...</p> : ""}
    </div>
  );
}
