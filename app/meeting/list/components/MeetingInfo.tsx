import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/ui/Button';
import MeetingProgress from '@/components/ui/card/MeetingProgress';
import Category from '@/components/ui/chip/Category';
import ChipInfo from '@/components/ui/chip/ChipInfo';
import { Meeting } from '@/types/meeting.types';

import HostInfo from '../../components/HostInfo';

import Card from './Card';

import useLikeToggle from '@/hooks/useLikeToggle';

export default function MeetingInfo({
  meetings,
  onClick,
}: {
  meetings: Meeting;
  onClick: () => void;
}) {
  const { isLiked, handleLikeClick } = useLikeToggle(meetings.id, meetings.isLiked, onClick);

  return (
    <Card>
      <div className="relative">
        <div className="transition-shadow duration-300 hover:rounded-2xl hover:shadow-[0px_10px_20px_-5px_rgba(0,0,0,0.1)]">
          <Link href={`/meeting/detail/${meetings.id}`} className="block">
            <div className="flex h-[430px] flex-col justify-between overflow-hidden">
              <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden">
                <div className="absolute left-0 top-0 z-0 size-[10px] bg-white" />
                <div className="absolute bottom-0 right-0 z-0 size-[10px] bg-white" />
                <Image
                  src="/assets/card/example_image.png"
                  // src={meetings.image}
                  width={384}
                  height={200}
                  alt="thumbnail"
                  className="w-full"
                />
                <Card.Like isLiked={meetings.isLiked} onClick={onClick} meetingId={meetings.id} />
                <div className="absolute right-[14px] top-[17.5px]">
                  <Category type={meetings.category} />
                </div>
              </div>

              <div className="flex h-[206px] flex-col justify-between p-4 pt-0">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-2">
                    <Card.Title
                      name={meetings.name}
                      location={`${meetings.location.region_1depth_name} ${meetings.location.region_2depth_name}`}
                    />
                    <HostInfo
                      id={meetings.host.id}
                      name={meetings.host.name}
                      profileImage={meetings.host.profileImage}
                    />
                    <div className="flex h-[22px] flex-row items-center gap-1">
                      <ChipInfo datetime={meetings.dateTime} />
                    </div>
                  </div>
                  <div className="line-clamp-2 overflow-hidden text-ellipsis font-pretandard text-base font-medium text-[#8c8c8c]">
                    {meetings.description}
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className="flex flex-row items-center p-4">
            <MeetingProgress
              id={meetings.id}
              participantCount={meetings.participantCount}
              capacity={meetings.capacity}
              isConfirmed={meetings.isConfirmed}
              isCompleted={meetings.isCompleted}
            />

            <Link href={`/meeting/detail/${meetings.id}`} passHref>
              <Button className="ml-6" disabled={meetings.isCompleted}>
                {meetings.isCompleted ? '마감' : '번개 참여'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
