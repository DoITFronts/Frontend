'use client';

import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { ko } from 'date-fns/locale';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useMemo, useRef } from 'react';
import DatePicker from 'react-datepicker';

import toggleLike from '@/api/meeting/toggleLike';
import Icon from '@/components/shared/Icon';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/chip/Chip';
import DropDown from '@/components/ui/DropDown';
import EmptyMessage from '@/components/ui/EmptyMessage';
import useMeeting from '@/hooks/useMeeting';
import { defaultFirstOption, defaultSecondOption } from '@/lib/constants';
import meetingCategory from '@/lib/constants/meeting';
import useModalStore from '@/store/useModalStore';
import { Meeting } from '@/types/meeting.types';
import { regions } from '@/types/regions';

import MeetingItem from './MeetingItem';
import { MeetingCardError, MeetingCardLoading } from './skeleton/MeetingCardSkeleton';

interface InitialMeetingsProps {
  initialMeetings: Meeting[];
}

// 드롭다운 재사용 컴포넌트
function FilterDropdown({
  options,
  selectedValue,
  onSelect,
}: {
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}) {
  return (
    <DropDown
      options={options}
      onSelect={onSelect}
      selectedValue={selectedValue}
      trigger={
        <div className="inline-flex h-10 flex-row items-center justify-center rounded-xl border border-[#8c8c8c] bg-white px-2.5 py-2 text-center font-pretandard text-sm font-medium leading-tight text-[#8c8c8c] hover:bg-[#595959] hover:text-white">
          {selectedValue}
          <Icon path="chevron_down" />
        </div>
      }
      optionClassName="justify-start min-w-[95px] py-[10px] px-4 text-[#8c8c8c] text-base font-semibold font-pretandard leading-normal"
    />
  );
}

export default function MeetingList({ initialMeetings }: InitialMeetingsProps) {
  const queryClient = useQueryClient();
  const { openModal } = useModalStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL에서 가져온 검색 조건을 상태로 관리
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '전체');
  const [selectedFirstLocation, setSelectedFirstLocation] = useState(
    searchParams.get('location_1') || defaultFirstOption,
  );
  const [selectedSecondLocation, setSelectedSecondLocation] = useState(
    searchParams.get('location_2') || defaultSecondOption,
  );
  const [selectedDate, setSelectedDate] = useState(
    searchParams.get('date') ? new Date(searchParams.get('date') as string) : null,
  );
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '전체');
    setSelectedFirstLocation(searchParams.get('location_1') || defaultFirstOption);
    setSelectedSecondLocation(searchParams.get('location_2') || defaultSecondOption);
    setSelectedDate(searchParams.get('date') ? new Date(searchParams.get('date') as string) : null);
  }, [searchParams]);

  // URL을 변경하여 상태 업데이트
  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  //  카테고리 변경 핸들러
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    updateSearchParams('category', category === '전체' ? '' : category);
  };

  // 첫 번째 지역 선택
  const handleSelectFirstLocation = (selected: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // 첫 번째 지역을 업데이트
    if (selected === defaultFirstOption) {
      params.delete('location_1');
      params.delete('location_2'); // 첫 번째 지역을 초기화하면 두 번째 지역도 초기화
    } else {
      params.set('location_1', selected);

      // 현재 선택된 두 번째 지역이 유효한지 확인 후 유지
      const validSecondLocations = regions[selected] || [];
      if (!validSecondLocations.includes(selectedSecondLocation)) {
        params.delete('location_2');
      }
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // 두 번째 지역 선택
  const handleSelectSecondLocation = (selected: string) => {
    setSelectedSecondLocation(selected);
    updateSearchParams('location_2', selected);
  };

  // 날짜 변경 핸들러
  const handleDateChange = (date: Date | null) => {
    if (date?.toDateString() === selectedDate?.toDateString()) {
      setSelectedDate(null);
      updateSearchParams('date', '');
    } else if (date) {
      const fixedDate = new Date(date);
      fixedDate.setHours(12, 0, 0, 0); // **12시로 고정** (UTC 보정용)
      setSelectedDate(fixedDate);
      updateSearchParams('date', fixedDate.toISOString().split('T')[0]); // ISO 포맷 유지
    } else {
      setSelectedDate(null);
      updateSearchParams('date', '');
    }
  };

  // 좋아요 Mutation
  const likeMutation = useMutation({
    mutationFn: (meetingId: number) => toggleLike(meetingId),
    onMutate: async (meetingId: number) => {
      await queryClient.cancelQueries({ queryKey: ['meetings'] });

      // 기존 데이터 가져오기
      const prevData = queryClient.getQueryData<InfiniteData<Meeting[]>>(['meetings']);

      // 새로운 좋아요 상태 적용 (낙관적 업데이트)
      queryClient.setQueryData(['meetings'], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: Meeting[]) =>
            page.map((meeting) =>
              meeting.id === meetingId ? { ...meeting, isLiked: !meeting.isLiked } : meeting,
            ),
          ),
        };
      });

      return { prevData };
    },
    onError: (_err, _meetingId, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(['meetings'], context.prevData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
    },
  });

  // useInfiniteQuery를 사용해 번개 데이터 가져오기
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useMeeting({
    category: selectedCategory,
    city: selectedFirstLocation,
    town: selectedSecondLocation,
    date: selectedDate,
    per_page: 10,
    initialMeetings,
  });

  // 번개 데이터 통합
  const meetings = useMemo(
    () =>
      data?.pages.flatMap((page) =>
        page?.lighteningResponses ? page.lighteningResponses : page,
      ) || [],
    [data?.pages],
  );

  console.log(meetings);

  // IntersectionObserver를 이용한 무한 스크롤 구현
  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1.0 },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  // 지역 목록 생성
  const meetingLocationFirst = useMemo(() => [defaultFirstOption, ...Object.keys(regions)], []);
  const meetingLocationSecond = useMemo(
    () => [defaultSecondOption, ...(regions[selectedFirstLocation] || [])],
    [selectedFirstLocation],
  );

  // 번개 생성 모달 핸들러
  const handleClickCreateMeeting = () => {
    openModal('create');
  };

  // 캘린더 모달 핸들러
  const handleClickCalendar = () => {
    openModal('calender');
  };

  // 좋아요 버튼 클릭 핸들러
  const handleClickLike = (meetingId: number) => {
    likeMutation.mutate(meetingId);
  };

  return (
    <div className="container mx-auto mt-[72px] max-w-[1200px] px-4">
      {/* 제목 */}
      <div className="mb-[52px] flex items-center justify-between">
        <div className="inline-flex h-[68px] flex-col items-start justify-start gap-[9px]">
          <div className="text-center font-dunggeunmo text-3xl font-normal text-black">
            맛집 탐방 같이 갈 사람, 누구 없나요?
          </div>
          <div className="text-center font-pretandard text-2xl font-normal text-black">
            맛집 탐방 같이 갈 사람, 누구 없나요?
          </div>
        </div>
        <Button color="white" size="sm" type="submit" onClick={handleClickCreateMeeting}>
          번개 만들기
        </Button>
      </div>

      {/* 번개 카테고리 */}
      <div className="mb-10 flex gap-3">
        {meetingCategory.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleCategoryClick(category)}
            className="cursor-pointer focus:outline-none"
          >
            <Chip
              text={category}
              size="lg"
              mode={selectedCategory === category ? 'dark' : 'light'}
            />
          </button>
        ))}
      </div>

      {/* 필터링 드롭다운 */}
      {/* TODO: 마감일자, 참여인원 필터링 추가 */}
      <div className="flex-start mb-10 flex gap-3">
        <FilterDropdown
          options={meetingLocationFirst}
          selectedValue={selectedFirstLocation}
          onSelect={handleSelectFirstLocation}
        />
        <FilterDropdown
          options={meetingLocationSecond}
          selectedValue={selectedSecondLocation}
          onSelect={handleSelectSecondLocation}
        />
        <DropDown
          options={
            <DatePicker
              locale={ko}
              inline
              selected={selectedDate}
              onChange={handleDateChange}
              dayClassName={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const isToday = date.getTime() === today.getTime();
                const isSelected = selectedDate?.getTime() === date.getTime();

                if (isSelected) return 'custom-selected'; // 선택된 날짜
                if (isToday) return 'custom-today'; // 오늘 날짜
                return 'custom-default'; // 기본 날짜
              }}
              calendarClassName="custom-calendar"
            />
          }
          trigger={
            <div className="inline-flex h-10 flex-row items-center justify-center rounded-xl border border-[#8c8c8c] bg-white px-2.5 py-2 text-center font-pretandard text-sm font-medium leading-tight text-[#8c8c8c] hover:bg-[#595959] hover:text-white">
              {selectedDate ? selectedDate.toLocaleDateString() : '날짜'}
              <Icon path="chevron_down" />
            </div>
          }
          onSelect={handleClickCalendar}
        />
      </div>

      {/* 번개 리스트 */}
      <div>
        {isLoading && <MeetingCardLoading />}
        {isError && <MeetingCardError />}
        {!isLoading && !isError && meetings.length === 0 && (
          <EmptyMessage firstLine="아직 번개가 없어요" secondLine="지금 번개를 만들어 보세요!" />
        )}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {meetings.map((meeting: Meeting, index) => (
              <MeetingItem
                key={`${meeting.id}-${index}`}
                meeting={meeting}
                onClick={() => handleClickLike(meeting.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 무한 스크롤 트리거 */}
      <div ref={observerRef} className="h-10" />
      {isFetchingNextPage && <MeetingCardLoading />}
    </div>
  );
}
