'use client';

import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import CategoryFilter from '@/components/ui/chip/CategoryFilter';

import { GridSkeleton } from '../components/GridSkeleton';
import { MeetingCardError } from '../components/MeetingCardSkeleton';
import MeetingTabs from '../components/MeetingTab';

const MENU_TABS = ['나의 번개', '내가 만든 번개', '리뷰', '채팅'];
const ACTIVITY_TABS = ['술', '카페', '보드게임', '맛집'];

export default function MyPage() {
  const [selectedMenuTab, setSelecetedMenuTab] = useState('나의 번개');
  const [selectedActivityTab, setSelectedActivityTab] = useState('');

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
      {/* 헤더 및 필터 영역 */}
      <div className="flex size-auto flex-col gap-5">
        <div className="flex size-auto items-center gap-3">
          {MENU_TABS.map((tab) => (
            <button className="cursor-pointer" key={tab} onClick={() => handleMenuClick(tab)}>
              <CategoryFilter
                text={tab}
                size="lg"
                mode={tab === selectedMenuTab ? 'dark' : 'light'}
              />
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

      {/* 컨텐츠 영역 - ErrorBoundary와 Suspense 활용 */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        <MeetingTabs menuTab={selectedMenuTab} activityTab={selectedActivityTab} />
      </div>
    </div>
  );
}
