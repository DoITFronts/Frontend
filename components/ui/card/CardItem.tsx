'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';

import { joinLightning, leaveLightning, deleteLightning } from '@/api/meeting/joinMeeting';
import Button from '@/components/ui/button/Button';
import MeetingStatus from '@/components/ui/card/component/MeetingStatus';
import DeleteMeetingModal from '@/components/ui/modal/variants/DeleteMeetingModal';
import useLikeToggle from '@/hooks/useLikeToggle';
import useModalStore from '@/store/useModalStore';
import categoryMap from '@/types/categoryMap';
import { Meeting } from '@/types/meeting';
import { cityMap } from '@/types/regions';
import { isUserLoggedIn } from '@/utils/auth/loginUtils';

import ChipDate from '../chip/ChipDate';

import Card from './Card';
import Category from './component/Category';
import HostInfo from './component/HostInfo';

interface Props {
  meeting: Meeting;
  onClick: () => void;
  priority?: boolean;
}

export default function CardItem({ meeting, onClick, priority }: Props) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { isLiked, handleLikeClick } = useLikeToggle(meeting.id, meeting.isLiked, onClick);
  const [isConfirmed, setIsConfirmed] = useState(meeting.isConfirmed);
  const [isCompleted, setIsCompleted] = useState(meeting.isCompleted);
  const [isJoined, setIsJoined] = useState(meeting.isJoined);
  const [participantCount, setParticipantCount] = useState(meeting.participantCount);
  const openModal = useModalStore((state) => state.openModal);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    const userId = typeof window !== 'undefined' ? localStorage.getItem('sub') : null;
    const host = meeting.participants?.find((participant) => participant.isHost);
    setIsHost(Number(userId) === host?.userId);
  }, [meeting.participants]);

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

    try {
      if (isJoined) {
        setIsJoined(false);
        setParticipantCount((prevCount) => prevCount - 1);
        setIsCompleted(participantCount - 1 >= meeting.capacity);
        setIsConfirmed(participantCount - 1 >= meeting.minCapacity);
        await leaveLightning(meeting.id);
        toast.success('모임 참여를 취소했습니다.', { autoClose: 900 });
      } else {
        setIsJoined(true);
        setParticipantCount((prevCount) => prevCount + 1);
        setIsCompleted(participantCount + 1 >= meeting.capacity);
        setIsConfirmed(participantCount + 1 >= meeting.minCapacity);
        await joinLightning(meeting.id);
        toast.success('모임에 참여했습니다.', { autoClose: 900 });
      }
    } catch (error) {
      setIsJoined(meeting.isJoined);
      setParticipantCount(meeting.participantCount);
      setIsConfirmed(meeting.isConfirmed);
      toast.error('오류가 발생했습니다.');
    }
  };

  const handleDeleteMeeting = async () => {
    if (!isUserLoggedIn()) {
      openModal('loginCheck');
      return;
    }

    await deleteLightning(meeting?.id as string);
    toast.success('모임을 삭제했습니다.', { autoClose: 900 });
    // 추가적인 삭제 후 처리 로직이 필요할 수 있습니다.
  };

  const buttonTextMap = {
    completed: '마감',
    joined: isHost ? '번개 삭제' : '참여 취소',
    default: '참여하기',
  };

  let buttonText;
  let buttonClickHandler;
  if (isCompleted && !isJoined) {
    buttonText = buttonTextMap.completed;
    buttonClickHandler = () => {};
  } else if (isJoined) {
    buttonText = buttonTextMap.joined;
    buttonClickHandler = isHost
      ? () => openModal('delete', { onConfirm: handleDeleteMeeting })
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
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="overflow-hidden rounded-b-2xl hover:shadow-[0px_10px_10px_1px_rgba(0,0,0,0.1)]"
    >
      <Card>
        <div className="relative">
          <Link href={`/meeting/detail/${meeting.id}`} className="block" prefetch={false}>
            <div className="flex flex-col justify-between gap-4 overflow-hidden">
              {/* 이미지 */}
              <div className="relative flex h-[172px] w-full items-center justify-center overflow-hidden md:h-[200px]">
                <div className="absolute left-0 top-0 z-10">
                  <Card.Like isLiked={isLiked} onClick={handleLikeClick} meetingId={meeting.id} />
                </div>
                <div className="absolute left-0 top-0 z-10 size-[10px] bg-white" />
                <div className="absolute bottom-0 right-0 z-10 size-[10px] bg-white" />
                <Image
                  src={
                    meeting.imageUrl ||
                    `/fallback/fallback_default.png` ||
                    `/fallback/fallback_${meeting?.category?.toLowerCase()}.png`
                  }
                  alt="thumbnail"
                  fill
                  className="z-0 object-cover"
                  priority={priority}
                />
                <div className="absolute right-[14px] top-[17.5px]">
                  <Category type={reverseCategoryMap[meeting.category]} />
                </div>
              </div>

              {/* 상세 정보 */}
              <div className="flex h-[152px] flex-col justify-between p-4 py-0">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-2">
                    <Card.Title
                      name={meeting.title || '제목 없음'}
                      location={`${reverseCityMap[meeting.city] || meeting.city || '지역 1'} ${reverseCityMap[meeting.town] || meeting.town || '지역 2'}`}
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
                      <ChipDate datetime={meeting.targetAt || new Date().toString()} />
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
              color={isJoined ? 'white' : 'filled'}
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
