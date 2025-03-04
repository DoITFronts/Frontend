'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import mockMeetings from '@/api/data/mockMeetings';
import { fetchMyPageMeetings, fetchMyPageReviews } from '@/api/myPage/myPage';
import Card from '@/app/meeting/list/components/Card';
import Icon from '@/components/shared/Icon';
import Button from '@/components/ui/Button';
import ButonBox from '@/components/ui/ButtonBox';
import MeetingProgress from '@/components/ui/card/MeetingProgress';
import Chip from '@/components/ui/chip/Chip';
import { Meeting } from '@/types/meeting.types';

const MENU_TABS = ['나의 번개', '내가 만든 번개', '리뷰', '채팅'];
const ACTIVITY_TABS = ['술', '카페', '보드 게임', '맛집'];
export default function Page() {
  const [selectedMenuTab, setSelecetedMenuTab] = useState('');
  const [selectedActivityTab, setSelectedActivityTab] = useState('');
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (selectedMenuTab === '리뷰') {
          const data = await fetchMyPageReviews();
          setReviews(data);
        } else {
          const data = await fetchMyPageMeetings({
            type: selectedMenuTab,
            category: selectedActivityTab || undefined,
          });
          setMeetings(data.meetings);
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
    if (tab === selectedActivityTab) {
      setSelectedActivityTab('');
    } else {
      setSelectedActivityTab(tab);
    }
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
                  <Image
                    src="/assets/card/example_image.png"
                    width={384}
                    height={200}
                    alt="thumbnail"
                    className="w-96"
                  />
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
                          2월 9일
                        </div>
                        <div className="size-[3px] rounded-full bg-[#bfbfbf]" />
                        <div className="font-['Pretendard'] text-base font-semibold text-[#bfbfbf]">
                          18:00
                        </div>
                      </div>
                    </div>

                    <div className="line-clamp-2 overflow-hidden text-ellipsis font-['Pretendard'] text-base font-medium text-[#8c8c8c]">
                      {meeting.description}
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
                    <ButonBox isJoined={meeting.isJoined} />
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
