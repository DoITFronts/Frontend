import Card from "@/components/ui/card/Card";
import ReviewHeart from "@/components/ui/review/ReviewHeart";
import { Review } from "@/types/myPage/myPage";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ReviewCardProps {
  review: Review;
  index: number;
}

export default function ReviewCard({ review, index }: ReviewCardProps) {
  return (
    <motion.div
      key={review.reviewId}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay: index * 0.1,
      }}
      className="overflow-hidden rounded-b-2xl hover:shadow-[0px_10px_10px_1px_rgba(0,0,0,0.1)]"
    >
      <Card mode="list">
        <div className="flex h-[430px] flex-col justify-between overflow-hidden">
          <Link
            href={`/reviews/${review.lighteningId}`}
            className="block"
            prefetch={false}
          >
            <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden">
              <div className="absolute left-0 top-0 z-0 size-[10px] bg-white" />
              <div className="absolute bottom-0 right-0 z-0 size-[10px] bg-white" />
              {review.lighteningImageUrl ? (
                <Image
                  src={review.lighteningImageUrl}
                  fill
                  alt="thumbnail"
                  className="object-cover"
                />
              ) : (
                <Image
                  src={`/fallback/fallback_${review.category}.png`}
                  fill
                  alt="thumbnail"
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex flex-col gap-[10px] p-4">
              <div className="flex flex-col gap-2">
                <Card.Title
                  name={review.title}
                  location={`${review.city} ${review.town}`}
                />
                <div className="flex h-[22px] flex-row items-center gap-1">
                  <div className="inline-flex items-start justify-start gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <div
                        key={idx}
                        style={{
                          position: "relative",
                          width: "28px",
                          height: "28px",
                        }}
                      >
                        <ReviewHeart fillPercentage={0} />
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "28px",
                            height: "28px",
                            overflow: "hidden",
                            clipPath: `inset(0 ${100 - (idx < review.rating ? 100 : 0)}% 0 0)`,
                          }}
                        >
                          <ReviewHeart fillPercentage={100} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="line-clamp-2 overflow-hidden text-ellipsis font-['Pretendard'] text-base font-medium text-[#8c8c8c]">
                {review.reviewContent}
              </div>
            </div>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
