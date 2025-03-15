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
import useMeetingToggle from "@/hooks/useMeetingToggle";
import { Meeting } from "@/types/meeting";
import { useToggleJoinMutation } from "@/hooks/useOptimisticQuery";
import { joinLightning, leaveLightning } from "@/api/meeting/joinMeeting";
import { useMyPageMeetings } from "@/hooks/useMyPage";
import { MeetingCardLoading } from "./MeetingCardSkeleton";
import useProfileStore from "@/store/useProfileStore";

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
  } = useMyPageMeetings({
    type: menuTab,
    category: activityTab || undefined,
  });

  // 토글 관련 훅 사용
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { toggleMeeting } = useMeetingToggle(setMeetings);

  // 외부에서 데이터가 바뀌면 로컬 상태 업데이트
  useEffect(() => {
    if (meetingsData && meetingsData.lighteningResponses) {
      setMeetings(meetingsData.lighteningResponses);
    } else {
      setMeetings([]);
    }
  }, [meetingsData]);

  const joinMutation = useToggleJoinMutation(joinLightning);
  const leaveMutation = useToggleJoinMutation(leaveLightning);

  const handleJoin = (meetingId: string) => {
    joinMutation.mutate(meetingId);
  };

  const handleCancel = (meetingId: string) => {
    leaveMutation.mutate(meetingId);
  };

  const currentUserId = useProfileStore((state) => state.id);
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
      <MeetingCardLoading />
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
      {meetings.map((meeting) => (
        // <motion.div
        //   ref={ref}
        //   key={meeting.id}
        //   initial={{ opacity: 0, y: 30 }}
        //   animate={inView ? { opacity: 1, y: 0 } : {}}
        //   transition={{ duration: 0.4, ease: 'easeOut' }}
        //   className="overflow-hidden rounded-b-2xl hover:shadow-[0px_10px_10px_1px_rgba(0,0,0,0.1)]"
        // >
        <Card mode="list">
          <div className="flex h-[430px] flex-col justify-between overflow-hidden">
            <Link
              href={`/meeting/detail/${meeting.id}`}
              className="block"
              prefetch={false}
            >
              <div className="relative flex h-[200px] w-96 items-center justify-center overflow-hidden">
                <div className="absolute left-0 top-0 z-0 size-[10px] bg-white" />
                <div className="absolute bottom-0 right-0 z-0 size-[10px] bg-white" />
                {meeting.imageUrl ? (
                  <Image
                    src={meeting.imageUrl}
                    width={384}
                    height={200}
                    alt="thumbnail"
                    className="w-96"
                  />
                ) : (
                  <Image
                    src="/assets/card/example_image.png"
                    width={384}
                    height={200}
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

            <div className="mt-aut flex h-auto w-full items-center gap-6 p-4">
              <MeetingStatus
                participantCount={meeting.participantCount}
                capacity={meeting.capacity}
                isConfirmed={meeting.isConfirmed}
                isCompleted={meeting.isCompleted}
              />
              <ButtonBox
                isJoined={meeting.isJoined}
                isCompleted={meeting.isCompleted}
                isHost={
                  meeting.participants?.some(
                    (participant) =>
                      participant.isHost &&
                      participant.userId === currentUserId,
                  ) || false
                }
                onJoin={() => handleJoin(meeting.id)}
                onCancel={() => handleCancel(meeting.id)}
              />
            </div>
          </div>
        </Card>
        // </motion.div>
      ))}
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
