import { useMyPageReviews } from "@/hooks/useMyPage";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { EmptyMessage, ErrorState, LoadingState } from "./StateComponents";
import ReviewCard from "./ReviewCard";
import InfiniteScrollLoader from "./InfiniteScrollLoader";

interface ReviewContainerProps {
  activityTab: string;
}

export default function ReviewContainer({ activityTab }: ReviewContainerProps) {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMyPageReviews({
    category: activityTab || undefined,
  });

  const reviews = data?.pages.flatMap((page) => page.reviews) || [];

  const { ref: loadMoreRef, inView: loadMoreInView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (loadMoreInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [loadMoreInView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  if (!reviews || reviews.length === 0) {
    <EmptyMessage
      message={`아직 작성한 리뷰가 없어요.\n미팅이 끝난 후 리뷰를 작성해 보세요!`}
    />;
  }

  return (
    <>
      {reviews.map((review, index) => (
        <ReviewCard key={review.reviewId} review={review} index={index} />
      ))}

      <InfiniteScrollLoader
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        loadMoreRef={loadMoreRef}
      />

      {!hasNextPage && reviews.length > 0 && (
        <div className="col-span-1 flex h-20 items-center justify-center md:col-span-2 lg:col-span-3">
          <p className="text-center text-base font-medium text-[#C0C1C2]">
            모든 리뷰를 불러왔습니다
          </p>
        </div>
      )}
    </>
  );
}
