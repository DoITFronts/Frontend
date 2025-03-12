'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Card from '@/app/meeting/list/components/Card';
import ButonBox from '@/components/ui/button/ButtonBox';
import MeetingProgress from '@/components/ui/card/MeetingProgress';
import ChipDate from '@/components/ui/chip/ChipDate';
import useMeetingToggle from '@/hooks/meeting/useMeetingToggle';
import { useState, useEffect } from 'react';
import { Meeting } from '@/types/meeting';
import { fetchMyPageMeetings, fetchMyPageReviews } from '@/api/client/myPage/myPage';
import { useInView } from 'react-intersection-observer';

// 응답 타입 정의
interface MeetingsResponse {
  lighteningResponses?: Meeting[];
  [key: string]: any;
}

interface ReviewResponse {
  [key: string]: any;
}

// 미팅 데이터를 가져오는 함수를 Promise로 캐싱
let meetingsCache = new Map<string, Promise<MeetingsResponse>>();

function getMeetingsData(menuTab: string, activityTab: string): Promise<MeetingsResponse> {
  const cacheKey = `${menuTab}-${activityTab}`;

  if (!meetingsCache.has(cacheKey)) {
    // Promise를 생성하고 캐시에 저장
    const promise = fetchMyPageMeetings({
      type: menuTab,
      category: activityTab || undefined,
    }) as Promise<MeetingsResponse>;

    meetingsCache.set(cacheKey, promise);

    // 5분 후 캐시 삭제 (선택적)
    setTimeout(
      () => {
        meetingsCache.delete(cacheKey);
      },
      5 * 60 * 1000,
    );
  }

  return meetingsCache.get(cacheKey) as Promise<MeetingsResponse>;
}

// 리뷰 데이터를 가져오는 함수를 Promise로 캐싱
let reviewsCache: Promise<ReviewResponse> | null = null;

function getReviewsData(): Promise<ReviewResponse> {
  if (!reviewsCache) {
    reviewsCache = fetchMyPageReviews() as Promise<ReviewResponse>;

    // 5분 후 캐시 삭제 (선택적)
    setTimeout(
      () => {
        reviewsCache = null;
      },
      5 * 60 * 1000,
    );
  }

  return reviewsCache;
}

interface MeetingTabsProps {
  menuTab: string;
  activityTab: string;
}

// 리뷰 탭 컴포넌트
function ReviewTab() {
  // try/catch 없이 use 직접 호출
  const reviewsData = use(getReviewsData());

  // 리뷰 데이터가 비어있는 경우
  if (
    !reviewsData ||
    Object.keys(reviewsData).length === 0 ||
    (Array.isArray(reviewsData) && reviewsData.length === 0)
  ) {
    return (
      <div className="col-span-3 flex h-40 items-center justify-center rounded-md bg-black-3 p-4">
        <p className="text-lg text-black-8">작성한 리뷰가 없어요.</p>
      </div>
    );
  }

  // 실제 리뷰 데이터가 있는 경우 (현재는 준비 중 메시지 표시)
  return (
    <div className="col-span-3 flex h-40 items-center justify-center">
      <p className="text-lg">리뷰 기능 준비 중</p>
    </div>
  );
}

// 미팅 리스트 컴포넌트
function MeetingList({ menuTab, activityTab }: { menuTab: string; activityTab: string }) {
  // try/catch 없이 use 직접 호출
  const meetingsData = use(getMeetingsData(menuTab, activityTab));

  // 토글 관련 훅 사용
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { toggleMeeting } = useMeetingToggle(setMeetings);

  // 외부에서 데이터가 바뀌면 로컬 상태 업데이트
  useEffect(() => {
    if (meetingsData && meetingsData.lighteningResponses) {
      setMeetings(meetingsData.lighteningResponses);
    } else {
      setMeetings([]);
    }
  }, [meetingsData]);

  // 데이터가 없는 경우 처리
  if (!meetings || meetings.length === 0) {
    return (
      <div className="col-span-3 flex h-[435px] items-center justify-center whitespace-pre-line bg-white">
        <p className="font-medium text-base text-[#C0C1C2] text-center">
          {menuTab === '나의 번개'
            ? `아직 참여한 번개가 없어요.\n지금 번개에 참여해 보세요!`
            : `아직 만든 번개가 없어요.\n지금 번개를 만들어 보세요!`}
        </p>
      </div>
    );
  }

  // 데이터가 있는 경우 렌더링
  return (
    <>
      {meetings.map((meeting, index) => (
        <motion.div
          ref={ref}
          key={meeting.id}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="overflow-hidden rounded-b-2xl hover:shadow-[0px_10px_10px_1px_rgba(0,0,0,0.1)]"
        >
          <Card mode="list">
            <div className="flex h-[430px] flex-col justify-between overflow-hidden">
              <Link href={`/meeting/detail/${meeting.id}`} className="block" prefetch={false}>
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

                <div className="flex flex-col gap-[10px] p-4">
                  <div className="flex flex-col gap-2">
                    <Card.Title name={meeting.title} location={`${meeting.city} ${meeting.town}`} />
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

              <div className="flex h-auto w-full gap-6 mt-aut items-center p-4">
                <MeetingProgress
                  id={meeting.id}
                  participantCount={meeting.participantCount}
                  capacity={meeting.capacity}
                  isConfirmed={meeting.isConfirmed}
                  isCompleted={meeting.isCompleted}
                />
                <ButonBox onClick={() => toggleMeeting(meeting)} isJoined={meeting.isJoined} />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </>
  );
}

// MeetingTabs 컴포넌트 - 탭에 따라 적절한 데이터 로드 및 렌더링
export default function MeetingTabs({ menuTab, activityTab }: MeetingTabsProps) {
  // 채팅 탭인 경우 준비 중 메시지 표시
  if (menuTab === '채팅') {
    return (
      <div className="col-span-3 flex h-40 items-center justify-center">
        <p className="text-lg">채팅 기능 준비 중</p>
      </div>
    );
  }

  // 리뷰 탭인 경우
  if (menuTab === '리뷰') {
    return <ReviewTab />;
  }

  // 번개 목록 (나의 번개 또는 내가 만든 번개) 표시
  return <MeetingList menuTab={menuTab} activityTab={activityTab} />;
}
