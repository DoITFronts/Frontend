import useMyPageState from "@/hooks/myPage/useMyPageState";
import MeetingTabHeader from "../components/MeetingTabHeader";
import ActivityFilter from "../components/ActivityFilter";
import { ErrorBoundary } from "react-error-boundary";
import ReviewContainer from "../components/ReviewContainer";
import MeetingContainer from "../components/MeetingContainer";
import { MeetingCardError } from "../components/MeetingCardSkeleton";

const MENU_TABS = ["나의 번개", "내가 만든 번개", "리뷰"];
const ACTIVITY_TABS = ["술", "카페", "보드게임", "맛집"];

export default function MyPage() {
  const {
    selectedMenuTab,
    selectedActivityTab,
    handleMenuClick,
    handleActivityClick,
  } = useMyPageState();

  return (
    <div className="flex h-auto w-full flex-col gap-10">
      {/* 헤더 및 필터 영역 */}
      <div className="flex size-auto flex-col gap-5">
        <MeetingTabHeader
          selectedMenuTab={selectedMenuTab}
          handleMenuClick={handleMenuClick}
          menuTabs={MENU_TABS}
        />

        <ActivityFilter
          selectedActivityTab={selectedActivityTab}
          handleActivityClick={handleActivityClick}
          activityTabs={ACTIVITY_TABS}
        />
      </div>

      {/* 컨텐츠 영역 - ErrorBoundary와 Suspense 활용 */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        <ErrorBoundary FallbackComponent={MeetingCardError}>
          {selectedMenuTab === "리뷰" ? (
            <ReviewContainer activityTab={selectedActivityTab} />
          ) : selectedMenuTab === "채팅" ? (
            <div className="col-span-3 flex h-40 items-center justify-center">
              <p className="text-lg">채팅 기능 준비 중</p>
            </div>
          ) : (
            <MeetingContainer
              menuTab={selectedMenuTab}
              activityTab={selectedActivityTab}
            />
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
}
