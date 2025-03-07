'use client';

import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import Icon from '@/components/shared/Icon';
import Chip from '@/components/ui/chip/Chip';
import DropDown from '@/components/ui/DropDown';
import { defaultFirstOption, defaultSecondOption } from '@/lib/constants';
import meetingCategory from '@/lib/constants/meeting';
import useModalStore from '@/store/useModalStore';
import { regions } from '@/types/regions';
import { Review } from '@/types/review';

import ReviewItem from './ReviewItem';
import ReviewStatus from './ReviewStatus';
import SmallReviewSkeleton from './skeleton/ReviewSkeleton';
import ReviewSkeleton from './skeleton/ReviewSkeleton';

// Reviews 사용
export interface ReviewListProps {
  id: string;
  category: string;
  summary: string;
  imageUrl: string;
  targetAt: string;
  city: string;
  town: string;
  participantCount: number;
  review: Review;
}

// TODO: 실제 api에서 데이터 가져오기
const reviews: ReviewListProps[] = [
  {
    id: '0',
    category: '카페',
    summary: '카페에서 공부해요!',
    imageUrl: 'https://codeit-doit.s3.ap-northeast-2.amazonaws.com/lightening/43/image.jpg',
    targetAt: '2025-03-06T02:50:00.155',
    city: '서울',
    town: '강동구',
    participantCount: 3,
    review: {
      id: '0',
      writer: '르키비키자너',
      profileImage: '',
      content:
        '카페에서 공부하니까 더 잘 되는 느?낌 카페에서 공부하니까 더 잘 되는 느?낌 카페에서 공부하니까 더 잘 되는 느?낌 ',
      date: '2025-03-08T02:50:00.155',
      count: 3,
    },
  },
  {
    id: '1',
    category: '보드게임',
    summary: '보드게임 정복하러 가실 분',
    imageUrl: 'https://codeit-doit.s3.ap-northeast-2.amazonaws.com/lightening/40/image.jpg',
    targetAt: '2025-03-12T02:50:00.155',
    city: '경기',
    town: '화성시',
    participantCount: 7,
    review: {
      id: '1',
      writer: '김정목',
      profileImage: '',
      content: '제가 1등을 해서 그런지 재밌었네요~~~',
      date: '2025-03-13T02:50:00.155',
      count: 5,
    },
  },
];

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

export default function ReviewList() {
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
  const [selectedFilter, setSelectedFilter] = useState(searchParams.get('filter') || '');
  const observerRef = useRef<HTMLDivElement | null>(null);

  const meetingLocationFirst = useMemo(() => [defaultFirstOption, ...Object.keys(regions)], []);
  const meetingLocationSecond = useMemo(
    () => [defaultSecondOption, ...(regions[selectedFirstLocation] || [])],
    [selectedFirstLocation],
  );

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '전체');
    setSelectedFirstLocation(searchParams.get('location_1') || defaultFirstOption);
    setSelectedSecondLocation(searchParams.get('location_2') || defaultSecondOption);
    setSelectedDate(
      searchParams.get('targetAt') ? new Date(searchParams.get('targetAt') as string) : null,
    );
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

  // 날짜 변경 핸들러
  const handleDateChange = (date: Date | null) => {
    if (date?.toDateString() === selectedDate?.toDateString()) {
      setSelectedDate(null);
      updateSearchParams('targetAt', '');
    } else if (date) {
      const fixedDate = new Date(date);
      fixedDate.setHours(12, 0, 0, 0); // **12시로 고정** (UTC 보정용)
      setSelectedDate(fixedDate);
      updateSearchParams('targetAt', `${fixedDate.toISOString().split('T')[0]}T00:00:00`); // ISO 포맷 유지
    } else {
      setSelectedDate(null);
      updateSearchParams('targetAt', '');
    }
  };

  // 마감 임박, 참여 인원 필터링 클릭 핸들러
  // TODO: 실제 api에 맞는 params 참조
  const handleSelectFilter = (selected: string) => {
    setSelectedFilter(selected);
    updateSearchParams('filter', selected);
  };

  // 캘린더 모달 핸들러
  const handleClickCalendar = () => {
    openModal('calender');
  };

  // 날짜 필터링 초기화 클릭 핸들러
  const handleResetDate = () => {
    setSelectedDate(null);
    updateSearchParams('targetAt', '');
  };

  // 마감 임박, 참여 인원 필터링 초기화 클릭 핸들러
  const handleResetFilter = () => {
    setSelectedFilter('');
    updateSearchParams('filter', '');
  };

  return (
    <div className="container mx-auto mt-[72px] max-w-[1200px] px-4">
      {/* 제목 */}
      <div className="mb-[52px] flex flex-col gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={100} height={100} />
        <div>번개팅을 이용한 분들은 이렇게 느꼈어요 🫶</div>
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

      {/* 리뷰 점수 */}
      <div className="flex justify-center">
        <div className="mb-10 flex w-[1000px] items-center justify-center border-y-gray-200">
          <ReviewStatus reviews={reviews} />
        </div>
      </div>

      {/* 필터링 드롭다운 */}
      <div className="flex justify-between">
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
                minDate={new Date()}
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
                <div onClick={handleResetDate}>
                  <Icon path={selectedDate ? 'x' : 'chevron_down'} />
                </div>
              </div>
            }
            onSelect={handleClickCalendar}
          />
        </div>
        <DropDown
          options={['최신순', '리뷰 높은 순', '참여 인원 순']}
          selectedValue={selectedFilter}
          onSelect={handleSelectFilter}
          trigger={
            <div className="inline-flex h-10 flex-row items-center justify-center rounded-xl border border-[#8c8c8c] bg-white px-2.5 py-2 text-center font-pretandard text-sm font-medium leading-tight text-[#8c8c8c] hover:bg-[#595959] hover:text-white">
              {selectedFilter || '최신순'}
              <div onClick={handleResetFilter} aria-label="필터 초기화" className="cursor-pointer">
                <Icon path={selectedFilter ? 'x' : 'chevron_down'} />
              </div>
            </div>
          }
          optionClassName="justify-start min-w-[115px] py-[10px] px-4 text-[#8c8c8c] text-base font-semibold font-pretandard leading-normal"
        />
      </div>

      {/* 리뷰 리스트 */}
      <div className="flex flex-col gap-y-6">
        {reviews.map((review) => (
          <ReviewItem key={review.id} reviews={review} />
        ))}
      </div>

      {/* 무한 스크롤 트리거 */}
      {/* TODO: isLoading에 따른 스켈레톤 처리 */}
      <ReviewSkeleton />
      <div ref={observerRef} className="h-10" />
      {/* TODO: 무한 스크롤 처리 */}
      {/* {isFetchingNextPage && <MeetingCardLoading />} */}
    </div>
  );
}
