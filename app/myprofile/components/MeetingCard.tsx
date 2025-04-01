"use client";

import ButtonBox from "@/components/ui/button/ButtonBox";
import Card from "@/components/ui/card/Card";
import MeetingStatus from "@/components/ui/card/component/MeetingStatus";
import { Meeting } from "@/types/meeting/meeting";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ChipDate from "@/components/ui/chip/ChipDate";

interface MeetingCardProps {
  meeting: Meeting;
  index: number;
  currentUserId: number;
  onJoin: (id: string) => void;
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
  onReview: (id: string) => void;
}

export default function MeetingCard({
  meeting,
  index,
  currentUserId,
  onJoin,
  onCancel,
  onDelete,
  onReview,
}: MeetingCardProps) {
  const isHost =
    meeting.participants?.some(
      (participant) =>
        participant.isHost && participant.userId === currentUserId,
    ) || false;

  return (
    <motion.div
      key={meeting.id}
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
                  src={`/fallback/fallback_${meeting.category}.png`}
                  fill
                  alt="thumbnail"
                  className="object-cover"
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
              isHost={isHost}
              onDelete={() => onDelete(meeting.id)}
              onJoin={() => onJoin(meeting.id)}
              onCancel={() => onCancel(meeting.id)}
              onReview={() => onReview(meeting.id)}
              chatIconDisabled={false}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
