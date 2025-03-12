'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';

import { joinLightning, leaveLightning } from '@/api/meeting/joinMeeting';
import Button from '@/components/ui/Button';
import MeetingProgress from '@/components/ui/card/MeetingProgress';
import Category from '@/components/ui/chip/Category';
import ChipInfo from '@/components/ui/chip/ChipInfo';
import useLikeToggle from '@/hooks/useLikeToggle';
import useModalStore from '@/store/useModalStore';
import categoryMap from '@/types/categoryMap';
import { Meeting } from '@/types/meeting';
import { cityMap } from '@/types/regions';
import isUserLoggedIn from '@/utils/authUtils';

import HostInfo from '../../components/HostInfo';

import Card from './Card';
import ButtonBox from '@/components/ui/ButtonBox';
import { useToggleJoinMutation } from '@/hooks/useOptimisticQuery';

interface Props {
  meeting: Meeting;
  onClick: () => void;
  priority?: boolean;
}

export default function MeetingItem({ meeting, onClick, priority }: Props) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { isLiked, handleLikeClick } = useLikeToggle(meeting.id, meeting.isLiked, onClick);
  const [isJoined, setIsJoined] = useState(false);
  const { openModal } = useModalStore();

  const reverseCityMap: Record<string, string> = Object.fromEntries(
    Object.entries(cityMap).map(([kor, eng]) => [eng, kor]),
  );

  const reverseCategoryMap: Record<string, string> = Object.fromEntries(
    Object.entries(categoryMap).map(([kor, eng]) => [eng, kor]),
  );

  const handleJoinToggle = async () => {
    if (!isUserLoggedIn()) {
      openModal('loginCheck');
      return;
    }

    if (isJoined) {
      await leaveLightning(meeting?.id as string);
      toast.success('모임 참여를 취소했습니다.', { autoClose: 900 });
    } else {
      await joinLightning(meeting?.id as string);
      toast.success('모임에 참여했습니다.', { autoClose: 900 });
    }
    setIsJoined(!isJoined);
  };

  const buttonTextMap = {
    completed: '마감',
    joined: '참여 취소하기',
    default: '참여하기',
  };

  const joinMutation = useToggleJoinMutation(joinLightning);
  const leaveMutation = useToggleJoinMutation(leaveLightning);

  const handleJoin = (meetingId: string) => {
    joinMutation.mutate(meetingId);
  };

  const handleCancel = (meetingId: string) => {
    leaveMutation.mutate(meetingId);
  };

  let buttonText;
  if (meeting.isCompleted) {
    buttonText = buttonTextMap.completed;
  } else if (meeting.isJoined) {
    buttonText = buttonTextMap.joined;
  } else {
    buttonText = buttonTextMap.default;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="overflow-hidden rounded-b-2xl hover:shadow-[0px_10px_10px_1px_rgba(0,0,0,0.1)]"
    >
      <Card>
        <div className="relative">
          <Link href={`/meeting/detail/${meeting.id}`} className="block" prefetch={false}>
            <div className="flex h-[430px] flex-col justify-between overflow-hidden">
              {/* 이미지 */}
              <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden">
                <Card.Like isLiked={isLiked} onClick={handleLikeClick} meetingId={meeting.id} />
                <div className="absolute left-0 top-0 z-0 size-[10px] bg-white" />
                <div className="absolute bottom-0 right-0 z-0 size-[10px] bg-white" />
                <Image
                  src={meeting.imageUrl || '/assets/card/example_image.png'}
                  width={384}
                  height={200}
                  alt="thumbnail"
                  className="w-full"
                  priority={priority}
                />
                <div className="absolute right-[14px] top-[17.5px]">
                  <Category type={reverseCategoryMap[meeting.category]} />
                </div>
              </div>

              {/* 상세 정보 */}
              <div className="flex h-[206px] flex-col justify-between p-4 pt-0">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-2">
                    <Card.Title
                      name={meeting.title}
                      location={`${reverseCityMap[meeting.city] || meeting.city} ${reverseCityMap[meeting.town] || meeting.town}`}
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
                      <ChipInfo datetime={meeting.targetAt} />
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
            <MeetingProgress
              id={meeting.id}
              participantCount={meeting.participantCount}
              capacity={meeting.capacity}
              isConfirmed={meeting.isConfirmed}
              isCompleted={meeting.isCompleted}
            />
            {/* <Button
              color={isJoined ? 'white' : 'filled'}
              type="button"
              onClick={handleJoinToggle}
              disabled={meeting.isCompleted}
            >
              {buttonText}
            </Button> */}
            <ButtonBox
              isJoined={meeting.isJoined}
              isCompleted={meeting.isCompleted}
              onJoin={() => handleJoin(meeting.id)}
              onCancel={() => handleCancel(meeting.id)}
              chatIconDisabled={true}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
