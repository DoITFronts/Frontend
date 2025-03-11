'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import useMeetingToggle from '@/hooks/useMeetingToggle';
import { fetchMyPageMeetings, fetchMyPageReviews } from '@/api/myPage/myPage';
import Card from '@/app/meeting/list/components/Card';
import ButonBox from '@/components/ui/ButtonBox';
import MeetingProgress from '@/components/ui/card/MeetingProgress';
import Chip from '@/components/ui/chip/Chip';
import { Meeting } from '@/types/meeting';
import categoryMap from '@/types/categoryMap';
import ChipInfo from '@/components/ui/chip/ChipInfo';
import { joinLightning, leaveLightning } from '@/api/meeting/joinMeeting';
import { toast } from 'react-toastify';

const MENU_TABS = ['나의 번개', '내가 만든 번개', '리뷰', '채팅'];
const ACTIVITY_TABS = ['술', '카페', '보드게임', '맛집'];

export default function Page() {
  const [selectedMenuTab, setSelecetedMenuTab] = useState('나의 번개');
  const [selectedActivityTab, setSelectedActivityTab] = useState('');
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toggleMeeting } = useMeetingToggle(setMeetings);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (selectedMenuTab === '리뷰') {
          const data = await fetchMyPageReviews();
          setReviews(data);
        } else {
          const categoryInEnglish = selectedActivityTab
            ? categoryMap[selectedActivityTab]
            : 'ALCOHOL';
          console.log('원본 카테고리:', selectedActivityTab);
          console.log('변환된 카테고리:', categoryInEnglish);
          const data = await fetchMyPageMeetings({
            type: selectedMenuTab,
            category: selectedActivityTab || undefined,
          });
          console.log(data);
          if (data && data.lighteningResponses) {
            setMeetings(data.lighteningResponses);
          } else {
            setMeetings([]);
          }
        }
      } catch (error) {
        console.error('데이터 불러오기 실패: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedMenuTab, selectedActivityTab]);

  const handleMenuClick = (tab: string) => {
    if (tab === selectedMenuTab) {
      setSelecetedMenuTab('');
    } else {
      setSelecetedMenuTab(tab);
    }
  };
  const handleActivityClick = (tab: string) => {
    console.log(tab);
    if (tab === selectedActivityTab) {
      setSelectedActivityTab('');
    } else {
      setSelectedActivityTab(tab);
    }
  };

  const handleMeeting = (meeting: Meeting) => {
    return toggleMeeting(meeting);
  };

  return (
    <div className="flex h-auto w-full flex-col gap-10">
      <div className="flex size-auto flex-col gap-5">
        <div className="flex size-auto items-center gap-3">
          {MENU_TABS.map((tab) => (
            <button className="cursor-pointer" key={tab} onClick={() => handleMenuClick(tab)}>
              <Chip text={tab} size="lg" mode={tab === selectedMenuTab ? 'dark' : 'light'} />
            </button>
          ))}
        </div>
        <div className="flex size-auto items-center gap-3">
          {ACTIVITY_TABS.map((activity) => (
            <button
              key={activity}
              className={`border-black-1 rounded-[12px] border py-2 pl-2.5 pr-[6px] text-black-6 ${selectedActivityTab === activity ? 'bg-black text-white' : ''}`}
              onClick={() => handleActivityClick(activity)}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex size-[24px] items-center justify-center">
                  <div className="flex size-4 items-center justify-center rounded-[5px] border border-black-6 bg-white">
                    {selectedActivityTab === activity ? (
                      <svg
                        width="10"
                        height="7"
                        viewBox="0 0 10 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.00004 2.5L4.50009 6C6.98524 3.21054 6.46948 3.78946 8.95464 1"
                          stroke="#595959"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <span># {activity}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-6 gap-y-10">
        {selectedMenuTab === '리뷰' ? (
          <div>리뷰 기능 준비 중</div>
        ) : selectedMenuTab === '채팅' ? (
          <div>채팅 기능 준비 중</div>
        ) : (
          meetings.map((meeting) => (
            <Card key={meeting.id} mode="list">
              <div className="flex h-[430px] flex-col justify-between overflow-hidden">
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

                <div className="flex h-[206px] flex-col justify-between">
                  <div className="flex flex-col gap-[10px]">
                    <div className="flex flex-col gap-2">
                      <Card.Title
                        name={meeting.title}
                        location={`${meeting.city} ${meeting.town}`}
                      />
                      <div className="flex h-[22px] flex-row items-center gap-1">
                        <div className="font-['Pretendard'] text-base font-semibold text-[#bfbfbf]">
                          <ChipInfo datetime={meeting.targetAt} />
                        </div>
                      </div>
                    </div>

                    <div className="line-clamp-2 overflow-hidden text-ellipsis font-['Pretendard'] text-base font-medium text-[#8c8c8c]">
                      {meeting.summary}
                    </div>
                  </div>

                  <div className="flex h-auto w-full gap-6">
                    <MeetingProgress
                      id={meeting.id}
                      participantCount={meeting.participantCount}
                      capacity={meeting.capacity}
                      isConfirmed={meeting.isConfirmed}
                      isCompleted={meeting.isCompleted}
                    />
                    <ButonBox onClick={() => handleMeeting(meeting)} isJoined={meeting.isJoined} />
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
