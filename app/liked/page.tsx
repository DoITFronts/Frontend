'use client';

// TODO 단일 책임 원리 적용해주세용
// 카테고리 필터, 드롭다운 필터, 무한 스크롤
import { ko } from 'date-fns/locale';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useMemo, useRef } from 'react';
import DatePicker from 'react-datepicker';

import CardItem from '@/components/ui/card/CardItem';
import CategoryFilter from '@/components/ui/chip/CategoryFilter';
import DropDown from '@/components/ui/dropdown/DropDown';
import FilterDropdown from '@/components/ui/dropdown/FilterDropdown';
import EmptyMessage from '@/components/ui/list/EmptyMessage';
import Icon from '@/components/utils/Icon';
import useLikeMeeting from '@/hooks/useLikeMeeting';
import {
  defaultFilter,
  defaultFirstOption,
  defaultSecondOption,
  participantFilter,
} from '@/lib/constants';
import meetingCategory from '@/lib/constants/meeting';
import useModalStore from '@/store/useModalStore';
import { Meeting } from '@/types/meeting';
import { regions } from '@/types/regions';
import { formatShortDate } from '@/utils/formatDateTime';

import {
  MeetingCardError,
  MeetingCardLoading,
} from '../meeting/list/components/skeleton/MeetingCardSkeleton';

export default function LikedPage() {
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
    searchParams.get('targetAt') ? new Date(searchParams.get('targetAt') as string) : null,
  );
  const [selectedFilter, setSelectedFilter] = useState(searchParams.get('order') || '');
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 임시 날짜 상태
  const [tempDate, setTempDate] = useState<Date | null>(selectedDate);

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '전체');
    setSelectedFirstLocation(searchParams.get('location_1') || defaultFirstOption);
    setSelectedSecondLocation(searchParams.get('location_2') || defaultSecondOption);
    setSelectedFilter(searchParams.get('order') || '');
  }, [searchParams]);

  // URL을 변경하여 상태 업데이트
  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key === 'date' ? 'targetAt' : key, value);
    } else {
      params.delete(key === 'date' ? 'targetAt' : key);
    }
    router.replace(`?${decodeURIComponent(params.toString())}`, { scroll: false });
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

  // 날짜 확인 핸들러
  const handleDateConfirm = () => {
    setSelectedDate(tempDate);
    if (tempDate) {
      const fixedDate = new Date(tempDate);
      fixedDate.setHours(12, 0, 0, 0); // UTC 보정
      updateSearchParams('targetAt', `${fixedDate.toISOString().split('T')[0]}T00:00:00`);
    }
  };

  // 마감 임박, 참여 인원 필터링 클릭 핸들러
  const handleSelectFilter = (selected: string) => {
    setSelectedFilter(selected);
    updateSearchParams('order', selected);
  };

  // useInfiniteQuery를 사용해 번개 데이터 가져오기
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useLikeMeeting({
      category: selectedCategory,
      city: selectedFirstLocation,
      town: selectedSecondLocation,
      targetAt: selectedDate,
      size: 10,
      // initialMeetings 제거 또는 기본값으로 빈 배열 설정
      initialMeetings: [],
      order: selectedFilter,
    });

  // 번개 데이터 통합
  const meetings = useMemo(
    () =>
      data?.pages.flatMap((page) =>
        page?.lighteningResponses ? page.lighteningResponses : page,
      ) || [],
    [data?.pages],
  );

  // IntersectionObserver를 이용한 무한 스크롤 구현
  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { rootMargin: '150px', threshold: 0.3 },
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

  // 날짜 필터링 초기화 클릭 핸들러
  const handleResetDate = () => {
    setSelectedDate(null);
    setTempDate(null);
    updateSearchParams('targetAt', '');
  };

  // 마감 임박, 참여 인원 필터링 초기화 클릭 핸들러
  const handleResetFilter = () => {
    setSelectedFilter('');
    updateSearchParams('order', '');
  };

  // 캘린더 내부 스타일
  const getDayStyle = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isToday = date.getTime() === today.getTime();
    const isSelected = tempDate?.getTime() === date.getTime();
    const isFiltered = selectedDate?.getTime() === date.getTime();

    return {
      width: '32px',
      height: '32px',
      display: 'flex',
      padding: '10px',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '5px',
      color: '#8c8c8c',

      ...(isSelected || isFiltered ? { backgroundColor: 'black', color: 'white' } : {}),
      ...(isToday && { fontWeight: 'bold', color: 'black' }),
    };
  };

  return (
    <div className="container mx-auto mt-[72px] max-w-[1200px] px-4">
      {/* 제목 */}
      <div className="flex flex-col items-center justify-between sm:items-start md:flex-row">
        <div className="flex flex-col items-start gap-3">
          <div className="text-start align-middle font-dunggeunmo text-2xl font-normal leading-[100%] tracking-[-0.06em] text-black sm:whitespace-pre-line md:whitespace-normal md:text-3xl">
            찜한 번개를 한 눈에 확인할 수 있어요!
          </div>
          <div className="text-start align-middle font-pretandard text-base font-normal leading-[100%] tracking-normal text-black md:text-[22px]">
            관심 있는 번개를 찜해두면, 번개를 놓치지 않고 참여할 수 있어요
          </div>
        </div>
      </div>

      {/* 번개 카테고리 */}
      <div className="mb-3 flex gap-[10px] md:mb-5 md:gap-3 mt-6 md:mt-[50px]">
        {meetingCategory.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleCategoryClick(category)}
            className="cursor-pointer focus:outline-none"
          >
            <CategoryFilter
              text={category}
              size="lg"
              mode={selectedCategory === category ? 'dark' : 'light'}
            />
          </button>
        ))}
      </div>

      {/* 필터링 드롭다운 */}
      <div className="mb-[30px] flex justify-between md:mb-10">
        <div className="flex-start flex gap-[6px] md:gap-3">
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
            align="middle"
            options={
              <div className="flex flex-col gap-[10px] p-3">
                <DatePicker
                  locale={ko}
                  inline
                  selected={tempDate}
                  onChange={setTempDate}
                  minDate={new Date()}
                  calendarClassName="custom-calendar"
                  renderDayContents={(day, date) => <div style={getDayStyle(date)}>{day}</div>}
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleResetDate}
                    className="inline-flex items-center justify-center gap-2.5 self-stretch overflow-hidden rounded-xl border border-[#1e1e1e] bg-white  py-2.5"
                  >
                    <div className="relative w-[145px] justify-start text-center font-['Pretendard'] text-sm font-semibold leading-tight text-[#1e1e1e]">
                      초기화
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={handleDateConfirm}
                    className="inline-flex w-[145px] items-center justify-center gap-2.5 self-stretch overflow-hidden rounded-xl bg-black py-2.5"
                  >
                    <div className="relative justify-start text-center font-['Pretendard'] text-sm font-semibold leading-tight text-white">
                      완료
                    </div>
                  </button>
                </div>
              </div>
            }
            trigger={
              <div className="inline-flex h-9 flex-row items-center justify-center rounded-xl border border-[#8c8c8c] bg-white px-2.5 py-2 text-center font-pretandard text-sm font-medium leading-tight text-[#8c8c8c] hover:bg-[#595959] hover:text-white md:h-10">
                {selectedDate ? formatShortDate(selectedDate.toISOString()) : '날짜'}
                <div onClick={handleResetDate}>
                  <Icon path={selectedDate ? 'exit' : 'chevron_down'} />
                </div>
              </div>
            }
            onSelect={() => openModal('calendar')}
          />
        </div>
        <DropDown
          align="right"
          options={[defaultFilter, participantFilter]}
          selectedValue={selectedFilter}
          onSelect={handleSelectFilter}
          trigger={
            <div className="inline-flex h-9 flex-row items-center justify-center rounded-xl border border-[#8c8c8c] bg-white px-2.5 py-2 text-center font-pretandard text-sm font-medium leading-tight text-[#8c8c8c] hover:bg-[#595959] hover:text-white md:h-10">
              <div onClick={handleResetFilter} aria-label="필터 초기화" className="cursor-pointer">
                <Icon path={selectedFilter ? 'exit' : 'sort'} />
              </div>
            </div>
          }
          optionClassName="justify-start min-w-[95px] py-[10px] px-4 text-[#8c8c8c] text-base font-semibold font-pretandard leading-normal"
        />
      </div>

      {/* 번개 리스트 */}
      <div>
        {isLoading && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <MeetingCardLoading key={index} />
            ))}
          </div>
        )}
        {isError && <MeetingCardError />}
        {!isLoading && !isError && meetings.length === 0 && (
          <EmptyMessage firstLine="아직 번개가 없어요" secondLine="지금 번개를 만들어 보세요!" />
        )}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {meetings.map((meeting: Meeting, index) => (
              <CardItem
                key={`${meeting.id}-${index}`}
                meeting={meeting}
                onClick={() => {}}
                priority={index < 10}
              />
            ))}
          </div>
        )}
      </div>

      {/* 무한 스크롤 트리거 */}
      <div ref={observerRef} className="h-10" />
      {isFetchingNextPage && (
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <MeetingCardLoading key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
