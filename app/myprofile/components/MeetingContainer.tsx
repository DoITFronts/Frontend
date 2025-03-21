"use client";

import {
  joinLightning,
  leaveLightning,
} from "@/api/client/meeting/joinMeeting";
import useDeleteLightning from "@/hooks/meeting/useDeleteLightning";
import useMeetingToggle from "@/hooks/meeting/useMeetingToggle";
import { useMyPageMeetings } from "@/hooks/useMyPage";
import { useToggleJoinMutation } from "@/hooks/useOptimisticQuery";
import {
  LIGHTNING_CANCEL_ERROR,
  MEETING_JOIN_SUCCESS,
} from "@/lib/constants/toast";
import modalStore from "@/store/modalStore";
import profileStore from "@/store/profileStore";
import { Meeting } from "@/types/meeting/meeting";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";
import { GridSkeleton } from "./GridSkeleton";
import { EmptyMessage } from "./StateComponents";
import MeetingCard from "./MeetingCard";
import InfiniteScrollLoader from "./InfiniteScrollLoader";

interface MeetingContainerProps {
  menuTab: string;
  activityTab: string;
}

export default function MeetingContainer({
  menuTab,
  activityTab,
}: MeetingContainerProps) {
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

  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const { ref: infiniteScrollRef, inView: infiniteScrollInView } = useInView({
    threshold: 0.1,
  });

  const { toggleMeeting } = useMeetingToggle(setMeetings);
  const { openModal } = modalStore();
  const currentUserId = profileStore((state) => state.id);

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
  }, [infiniteScrollInView, hasNextPage, fetchNextPage]);

  const joinMutation = useToggleJoinMutation(joinLightning);
  const leaveMutation = useToggleJoinMutation(leaveLightning);
  const deleteMutation = useDeleteLightning();

  const handleJoin = (meetingId: string) => {
    joinMutation.mutate(meetingId);
  };
  const handleCancel = (meetingId: string) => {
    leaveMutation.mutate(meetingId, {
      onSuccess: () => {
        toast.success(MEETING_JOIN_SUCCESS), { autoClose: 900 };
      },
      onError: () => {
        toast.error(LIGHTNING_CANCEL_ERROR, { autoClose: 900 });
      },
    });
  };
  const handleDelete = (meetingId: string) => {
    openModal("delete", {
      onConfirm: () => {
        deleteMutation.mutate(meetingId);
      },
    });
  };

  const handleReview = (meetingId: string) => {
    openModal("createReview", {
      meetingId: meetingId,
    });
  };

  if (isLoading) {
    return <GridSkeleton />;
  }

  if (!meetings || meetings.length === 0) {
    return (
      <EmptyMessage
        message={
          menuTab === "나의 번개"
            ? `아직 참여한 번개가 없어요.\n지금 번개에 참여해 보세요!`
            : `아직 만든 번개가 없어요.\n 지금 번개를 만들어 보세요!`
        }
      />
    );
  }

  return (
    <>
      {meetings.map((meeting, index) => (
        <MeetingCard
          key={meeting.id}
          meeting={meeting}
          index={index}
          currentUserId={currentUserId}
          onJoin={handleJoin}
          onCancel={handleCancel}
          onDelete={handleDelete}
          onReview={handleReview}
        />
      ))}
      <InfiniteScrollLoader
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        loadMoreRef={infiniteScrollRef}
      />
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
