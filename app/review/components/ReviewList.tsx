'use client';

import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import Icon from '@/components/shared/Icon';
import Chip from '@/components/ui/chip/Chip';
import DropDown from '@/components/ui/DropDown';
import EmptyMessage from '@/components/ui/EmptyMessage';
import useReview from '@/hooks/useReview';
import { defaultFirstOption, defaultSecondOption } from '@/lib/constants';
import meetingCategory from '@/lib/constants/meeting';
import useModalStore from '@/store/useModalStore';
import { regions } from '@/types/regions';
import { Reviews } from '@/types/review';

import ReviewItem from './ReviewItem';
import ReviewStatus from './ReviewStatus';
import ReviewSkeleton from './skeleton/ReviewSkeleton';

interface InitialReviewsProps {
  initialReviews: {
    reviews: Reviews[];
    totalCount: number;
  };
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

export default function ReviewList({ initialReviews }: InitialReviewsProps) {
  const { openModal } = useModalStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { reviews, totalCount } = initialReviews;

  // URL에서 가져온 검색 조건을 상태로 관리
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '술');
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

  const meetingLocationFirst = useMemo(() => [defaultFirstOption, ...Object.keys(regions)], []);
  const meetingLocationSecond = useMemo(
    () => [defaultSecondOption, ...(regions[selectedFirstLocation] || [])],
    [selectedFirstLocation],
  );

  // 임시 날짜 상태
  const [tempDate, setTempDate] = useState<Date | null>(selectedDate);

  // useInfiniteQuery를 사용해 모든 리뷰 데이터 가져오기
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useReview({
    category: selectedCategory,
    city: selectedFirstLocation,
    town: selectedSecondLocation,
    targetAt: selectedDate,
    initialReviews: initialReviews.reviews,
  });

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '술');
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

  // 날짜 필터링 초기화 클릭 핸들러
  const handleResetDate = () => {
    setSelectedDate(null);
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

      ...(isToday && { fontWeight: 'bold', color: 'black' }),
      ...(isSelected || isFiltered ? { backgroundColor: 'black', color: 'white' } : {}),
    };
  };

  return (
    <div className="container mx-auto mt-[72px] max-w-[1200px] px-4">
      {/* 제목 */}
      <div className="mb-[50px] inline-flex flex-col items-start justify-start gap-3">
        <div className="relative justify-center text-center font-['DungGeunMo'] text-3xl font-normal text-black">
          모든 리뷰
        </div>
        <div className="relative justify-center text-center font-['Pretendard'] text-[22px] font-normal text-black">
          번개의 모든 리뷰를 살펴보세요:)
        </div>
      </div>

      {/* 번개 카테고리 */}
      <div className="mb-10 flex gap-3">
        {meetingCategory
          .filter((category) => category !== '전체') // '제외할 카테고리'를 제외
          .map((category) => (
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
              <div className="inline-flex h-10 flex-row items-center justify-center rounded-xl border border-[#8c8c8c] bg-white px-2.5 py-2 text-center font-pretandard text-sm font-medium leading-tight text-[#8c8c8c] hover:bg-[#595959] hover:text-white">
                {selectedDate ? selectedDate.toLocaleDateString() : '날짜'}
                <div onClick={handleResetDate}>
                  <Icon path={selectedDate ? 'exit' : 'chevron_down'} />
                </div>
              </div>
            }
            onSelect={() => openModal('calender')}
          />
        </div>
        <DropDown
          align="right"
          options={['리뷰 높은 순', '참여 인원 순']}
          selectedValue={selectedFilter}
          onSelect={handleSelectFilter}
          trigger={
            <div className="inline-flex h-10 flex-row items-center justify-center rounded-xl border border-[#8c8c8c] bg-white px-2.5 py-2 text-center font-pretandard text-sm font-medium leading-tight text-[#8c8c8c] hover:bg-[#595959] hover:text-white">
              <div onClick={handleResetFilter} aria-label="필터 초기화" className="cursor-pointer">
                <Icon path={selectedFilter ? 'exit' : 'sort'} />
              </div>
            </div>
          }
          optionClassName="justify-start min-w-[115px] py-[10px] px-4 text-[#8c8c8c] text-base font-semibold font-pretandard leading-normal"
        />
      </div>

      {/* 리뷰 리스트 */}
      <div>
        {isLoading && <ReviewSkeleton />}
        {isError && <ReviewSkeleton />}
        {!isLoading && !isError && reviews.length === 0 && (
          <EmptyMessage firstLine="아직 작성한 리뷰가 없어요" />
        )}
        <div className="flex flex-col gap-y-6">
          {reviews.map((review, index) => (
            <ReviewItem key={review.reviewId} review={review} priority={index < 10} />
          ))}
        </div>
      </div>

      {/* 무한 스크롤 트리거 */}
      <div ref={observerRef} className="h-10" />
      {isFetchingNextPage && <ReviewSkeleton />}
    </div>
  );
}
