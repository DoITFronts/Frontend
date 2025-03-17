"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";

import {
  joinLightning,
  leaveLightning,
  deleteLightning,
} from "@/api/client/meeting/joinMeeting";
import Button from "@/components/ui/button/Button";
import MeetingStatus from "@/components/ui/card/component/MeetingStatus";
import DeleteMeetingModal from "@/components/modal/variants/DeleteMeetingModal";
// import useLikeToggle from '@/hooks/like/useLikeToggle';
import modalStore from "@/store/modalStore";
import categoryMap from "@/types/map/categoryMap";
import { Meeting } from "@/types/meeting/meeting";
import { cityMap } from "@/types/map/regions";
import { isUserLoggedIn } from "@/utils/auth/loginUtils";

import ChipDate from "../chip/ChipDate";

import Card from "./Card";

import profileStore from "@/store/profileStore";

import Category from "./component/Category";
import HostInfo from "./component/HostInfo";

import {
  MEETING_JOIN_SUCCESS,
  MEETING_CANCEL_SUCCESS,
  MEETING_DELETE_SUCCESS,
  GENERAL_ERROR,
} from "@/lib/constants/toast";

interface Props {
  meeting: Meeting;
  onClick: () => void;
  priority?: boolean;
}

export default function CardItem({ meeting, onClick, priority }: Props) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  // const { isLiked, handleLikeClick } = useLikeToggle(meeting.id, meeting.isLiked, onClick);

  const [isConfirmed, setIsConfirmed] = useState(meeting.isConfirmed);
  const [isCompleted, setIsCompleted] = useState(meeting.isCompleted);
  const [isJoined, setIsJoined] = useState(meeting.isJoined);
  const [participantCount, setParticipantCount] = useState(
    meeting.participantCount,
  );
  const openModal = modalStore((state) => state.openModal);

  const reverseCityMap: Record<string, string> = Object.fromEntries(
    Object.entries(cityMap).map(([kor, eng]) => [eng, kor]),
  );

  const reverseCategoryMap: Record<string, string> = Object.fromEntries(
    Object.entries(categoryMap).map(([kor, eng]) => [eng, kor]),
  );

  const handleJoinToggle = async () => {
    if (!isUserLoggedIn()) {
      openModal("loginCheck");
      return;
    }

    try {
      if (isJoined) {
        setIsJoined(false);
        setParticipantCount((prevCount) => prevCount - 1);
        setIsCompleted(participantCount - 1 >= meeting.capacity);
        setIsConfirmed(participantCount - 1 >= meeting.minCapacity);
        await leaveLightning(meeting.id);

        toast.success(MEETING_CANCEL_SUCCESS);
      } else {
        setIsJoined(true);
        setParticipantCount((prevCount) => prevCount + 1);
        setIsCompleted(participantCount + 1 >= meeting.capacity);
        setIsConfirmed(participantCount + 1 >= meeting.minCapacity);
        await joinLightning(meeting.id);

        toast.success(MEETING_JOIN_SUCCESS);
      }
    } catch (error) {
      setIsJoined(meeting.isJoined);
      setParticipantCount(meeting.participantCount);
      setIsConfirmed(meeting.isConfirmed);

      toast.error(GENERAL_ERROR);
    }
  };

  const handleDeleteMeeting = async () => {
    if (!isUserLoggedIn()) {
      openModal("loginCheck");
      return;
    }

    await deleteLightning(meeting?.id as string);

    toast.success(MEETING_DELETE_SUCCESS);

    // 추가적인 삭제 후 처리 로직이 필요할 수 있습니다.
  };

  const currentUserId = profileStore((state) => state.id);

  const isCurrentUserHost =
    meeting.participants?.some(
      (participant) =>
        participant.isHost && participant.userId === currentUserId,
    ) || false;

  const buttonTextMap = {
    completed: "마감",
    joined: isCurrentUserHost ? "번개 삭제" : "참여 취소",
    default: "참여하기",
  };

  let buttonText;
  let buttonClickHandler;
  if (isCompleted && !isJoined) {
    buttonText = buttonTextMap.completed;
    buttonClickHandler = () => {};
  } else if (isJoined) {
    buttonText = buttonTextMap.joined;
    buttonClickHandler = isCurrentUserHost
      ? () => openModal("delete", { onConfirm: handleDeleteMeeting })
      : handleJoinToggle;
  } else {
    buttonText = buttonTextMap.default;
    buttonClickHandler = handleJoinToggle;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="overflow-hidden rounded-b-2xl hover:shadow-[0px_10px_10px_1px_rgba(0,0,0,0.1)]"
    >
      <Card>
        <div className="relative">
          <Link
            href={`/meeting/detail/${meeting.id}`}
            className="block"
            prefetch={false}
          >
            <div className="flex flex-col justify-between gap-4 overflow-hidden">
              {/* 이미지 */}
              <div className="relative flex h-[172px] w-full items-center justify-center overflow-hidden md:h-[200px]">
                <div className="absolute left-0 top-0 z-10">
                  <Card.Like isLiked={meeting.isLiked} meetingId={meeting.id} />
                </div>
                <div className="absolute left-0 top-0 z-10 size-[10px] bg-white" />
                <div className="absolute bottom-0 right-0 z-10 size-[10px] bg-white" />
                {meeting.imageUrl ? (
                  <Image
                    src={meeting.imageUrl}
                    fill
                    alt="thumbnail"
                    className="z-0 object-cover"
                    priority
                  />
                ) : (
                  <Image
                    src={`/fallback/fallback_${meeting.category}.png`}
                    fill
                    alt="thumbnail"
                    className="z-0 object-cover"
                    priority
                  />
                )}
                <div className="absolute right-[14px] top-[17.5px]">
                  <Category type={reverseCategoryMap[meeting.category]} />
                </div>
              </div>

              {/* 상세 정보 */}
              <div className="flex h-[152px] flex-col justify-between p-4 py-0">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-2">
                    <Card.Title
                      name={meeting.title || "제목 없음"}
                      location={`${reverseCityMap[meeting.city] || meeting.city || "지역 1"} ${reverseCityMap[meeting.town] || meeting.town || "지역 2"}`}
                    />
                    {meeting.participants
                      ?.filter((participant) => participant.isHost)
                      .map((participant) => (
                        <HostInfo
                          key={participant.userId}
                          name={participant.name}
                          profileImage={participant.image}
                        />
                      ))}

                    <div className="flex h-[22px] flex-row items-center gap-1">
                      <ChipDate
                        datetime={meeting.targetAt || new Date().toString()}
                      />
                    </div>
                  </div>
                  <div className="line-clamp-2 overflow-hidden text-ellipsis font-pretandard text-base font-medium text-[#8c8c8c]">
                    {meeting.summary}
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* 하단 버튼 및 진행률 */}
          <div className="flex flex-row items-center gap-4 p-4">
            <MeetingStatus
              participantCount={participantCount}
              capacity={meeting.capacity}
              isConfirmed={isConfirmed}
              isCompleted={isCompleted}
            />
            <Button
              color={isJoined ? "white" : "filled"}
              type="button"
              onClick={buttonClickHandler}
              disabled={isCompleted && !isJoined}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </Card>

      <DeleteMeetingModal />
    </motion.div>
  );
}
