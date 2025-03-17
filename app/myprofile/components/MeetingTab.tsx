"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ReviewTab from "./ReviewTab";
import Card from "@/components/ui/card/Card";
import ButtonBox from "@/components/ui/button/ButtonBox";
import MeetingStatus from "@/components/ui/card/component/MeetingStatus";
import ChipDate from "@/components/ui/chip/ChipDate";
import useMeetingToggle from "@/hooks/meeting/useMeetingToggle";
import { Meeting } from "@/types/meeting/meeting";
import { useToggleJoinMutation } from "@/hooks/useOptimisticQuery";
import {
  deleteLightning,
  joinLightning,
  leaveLightning,
} from "@/api/client/meeting/joinMeeting";
import { useMyPageMeetings } from "@/hooks/useMyPage";
import { MeetingCardLoading } from "./MeetingCardSkeleton";
import profileStore from "@/store/profileStore";
import modalStore from "@/store/modalStore";
import { GridSkeleton } from "./GridSkeleton";
import useDeleteLightning from "@/hooks/meeting/useDeleteLightning";

interface MeetingTabsProps {
  menuTab: string;
  activityTab: string;
}

// 미팅 리스트 컴포넌트
function MeetingList({
  menuTab,
  activityTab,
}: {
  menuTab: string;
  activityTab: string;
}) {
  // useMyPageMeetings 훅 사용
  const {
    data: meetingsData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMyPageMeetings({
    type: menuTab,
    category: activityTab || undefined,
  });

  // 토글 관련 훅 사용
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  // const { ref: animationRef, inView: animationInView } = useInView({
  //   threshold: 0.1,
  //   triggerOnce: true,
  // });
  const { ref: infiniteScrollRef, inView: infiniteScrollInView } = useInView({
    threshold: 0.1,
  });
  const { toggleMeeting } = useMeetingToggle(setMeetings);
  const { openModal } = modalStore();

  // 외부에서 데이터가 바뀌면 로컬 상태 업데이트
  useEffect(() => {
    if (meetingsData?.pages) {
      const allMeetings = meetingsData.pages.flatMap(
        (page) => page.lighteningResponses || [],
      );
      setMeetings(allMeetings);
    } else {
      setMeetings([]);
    }
  }, [meetingsData]);

  useEffect(() => {
    if (infiniteScrollInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [infiniteScrollInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const joinMutation = useToggleJoinMutation(joinLightning);
  const leaveMutation = useToggleJoinMutation(leaveLightning);
  const deleteMutation = useDeleteLightning();
  const handleJoin = (meetingId: string) => {
    joinMutation.mutate(meetingId);
  };

  const handleDelete = (meetingId: string) => {
    openModal("delete", {
      onConfirm: () => {
        deleteMutation.mutate(meetingId);
      },
    });
  };

  const handleCancel = (meetingId: string) => {
    leaveMutation.mutate(meetingId);
  };

  const handleReview = (meetingId: string) => {
    openModal("createReview", {
      meetingId: meetingId,
    });
  };

  const currentUserId = profileStore((state) => state.id);
  const isCurrentUserHost =
    meetings.some((meeting) =>
      meeting.participants?.some(
        (participant) =>
          participant.isHost && participant.userId === currentUserId,
      ),
    ) || false;

  // 로딩 중인 경우
  if (isLoading) {
    return (
      // <div className="col-span-3 flex h-[435px] items-center justify-center">
      //   <p className="text-center text-base font-medium text-[#C0C1C2]">로딩 중...</p>
      // </div>
      <GridSkeleton />
    );
  }

  // 에러가 발생한 경우
  if (error) {
    return (
      <div className="col-span-3 flex h-[435px] items-center justify-center">
        <p className="text-center text-base font-medium text-[#C0C1C2]">
          데이터를 불러오는데 문제가 발생했습니다.
        </p>
      </div>
    );
  }

  // 데이터가 없는 경우 처리
  if (!meetings || meetings.length === 0) {
    return (
      <div className="col-span-3 flex h-[435px] items-center justify-center whitespace-pre-line bg-white">
        <p className="text-center text-base font-medium text-[#C0C1C2]">
          {menuTab === "나의 번개"
            ? `아직 참여한 번개가 없어요.\n지금 번개에 참여해 보세요!`
            : `아직 만든 번개가 없어요.\n지금 번개를 만들어 보세요!`}
        </p>
      </div>
    );
  }

  // 데이터가 있는 경우 렌더링
  return (
    <>
      {meetings.map((meeting, index) => (
        <motion.div
          key={meeting.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
            delay: index * 0.1, // 각 카드마다 살짝 딜레이를 주어 순차적으로 나타나게 함
          }}
          className="overflow-hidden rounded-b-2xl hover:shadow-[0px_10px_10px_1px_rgba(0,0,0,0.1)]"
        >
          <Card mode="list">
            <div className="flex h-[430px] flex-col justify-between overflow-hidden">
              <Link
                href={`/meeting/detail/${meeting.id}`}
                className="block"
                prefetch={false}
              >
                <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden">
                  <div className="absolute left-0 top-0 z-0 size-[10px] bg-white" />
                  <div className="absolute bottom-0 right-0 z-0 size-[10px] bg-white" />
                  {meeting.imageUrl ? (
                    <Image
                      src={meeting.imageUrl}
                      fill
                      alt="thumbnail"
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src="/assets/card/example_image.png"
                      fill
                      alt="thumbnail"
                      className="w-96"
                    />
                  )}
                </div>

                <div className="flex flex-col gap-[10px] p-4">
                  <div className="flex flex-col gap-2">
                    <Card.Title
                      name={meeting.title}
                      location={`${meeting.city} ${meeting.town}`}
                    />
                    <div className="flex h-[22px] flex-row items-center gap-1">
                      <div className="font-['Pretendard'] text-base font-semibold text-[#bfbfbf]">
                        <ChipDate datetime={meeting.targetAt} />
                      </div>
                    </div>
                  </div>

                  <div className="line-clamp-2 overflow-hidden text-ellipsis font-['Pretendard'] text-base font-medium text-[#8c8c8c]">
                    {meeting.summary}
                  </div>
                </div>
              </Link>

              <div className="mt-auto flex h-auto w-full items-center gap-6 p-4">
                <MeetingStatus
                  participantCount={meeting.participantCount}
                  capacity={meeting.capacity}
                  isConfirmed={meeting.isConfirmed}
                  isCompleted={meeting.isCompleted}
                />
                <ButtonBox
                  isJoined={meeting.isJoined}
                  isCompleted={meeting.isCompleted}
                  isConfirmed={meeting.isConfirmed}
                  targetAt={meeting.targetAt}
                  roomId={meeting.chatRoomId}
                  isHost={
                    meeting.participants?.some(
                      (participant) =>
                        participant.isHost &&
                        participant.userId === currentUserId,
                    ) || false
                  }
                  onDelete={() => handleDelete(meeting.id)}
                  onJoin={() => handleJoin(meeting.id)}
                  onCancel={() => handleCancel(meeting.id)}
                  onReview={() => handleReview(meeting.id)}
                  chatIconDisabled={false}
                />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
      {hasNextPage && (
        <div ref={infiniteScrollRef} className="my-4 flex justify-center">
          {isFetchingNextPage ? (
            <p>더 불러오는 중...</p>
          ) : (
            <p>더 불러오려면 스크롤하세요</p>
          )}
        </div>
      )}
      {!hasNextPage && meetings.length > 0 && (
        <div className="col-span-1 flex h-20 items-center justify-center md:col-span-2 lg:col-span-3">
          <p className="text-center text-base font-medium text-[#C0C1C2]">
            모든 목록을 불러왔습니다
          </p>
        </div>
      )}
    </>
  );
}

// MeetingTabs 컴포넌트 - 탭에 따라 적절한 데이터 로드 및 렌더링
export default function MeetingTabs({
  menuTab,
  activityTab,
}: MeetingTabsProps) {
  // 채팅 탭인 경우 준비 중 메시지 표시
  if (menuTab === "채팅") {
    return (
      <div className="col-span-3 flex h-40 items-center justify-center">
        <p className="text-lg">채팅 기능 준비 중</p>
      </div>
    );
  }

  // 리뷰 탭인 경우
  if (menuTab === "리뷰") {
    return <ReviewTab activityTab={activityTab} />;
  }

  // 번개 목록 (나의 번개 또는 내가 만든 번개) 표시
  return <MeetingList menuTab={menuTab} activityTab={activityTab} />;
}
