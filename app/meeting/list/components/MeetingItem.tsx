'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

import Button from '@/components/ui/Button';
import ButtonBox from '@/components/ui/ButtonBox';
import MeetingProgress from '@/components/ui/card/MeetingProgress';
import Category from '@/components/ui/chip/Category';
import ChipInfo from '@/components/ui/chip/ChipInfo';
import useLikeToggle from '@/hooks/useLikeToggle';
import categoryMap from '@/types/categoryMap';
import { Meeting } from '@/types/meeting';
import { cityMap } from '@/types/regions';

import HostInfo from '../../components/HostInfo';

import Card from './Card';

interface Props {
  meeting: Meeting;
  onClick: () => void;
  priority?: boolean;
}

export default function MeetingItem({ meeting, onClick, priority }: Props) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { isLiked, handleLikeClick } = useLikeToggle(meeting.id, meeting.isLiked, onClick);

  const reverseCityMap: Record<string, string> = Object.fromEntries(
    Object.entries(cityMap).map(([kor, eng]) => [eng, kor]),
  );

  const reverseCategoryMap: Record<string, string> = Object.fromEntries(
    Object.entries(categoryMap).map(([kor, eng]) => [eng, kor]),
  );

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
          <div className="transition-shadow duration-300 hover:shadow-lg">
            <Link href={`/meeting/detail/${meeting.id}`} className="block" prefetch={false}>
              <div className="flex h-[430px] flex-col justify-between overflow-hidden">
                {/* 이미지 */}
                <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden">
                  <Card.Like isLiked={isLiked} onClick={handleLikeClick} meetingId={meeting.id} />
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
                            profileImage={participant.profileImage}
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
              <Link href={`/meeting/detail/${meeting.id}`} passHref prefetch={false}>
                <Button className="ml-6" disabled={meeting.isCompleted}>
                  {meeting.isCompleted ? '마감' : '번개 참여'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
