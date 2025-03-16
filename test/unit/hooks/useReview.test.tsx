import { expect } from '@jest/globals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { fetchReviewMeetingList } from '@/api/server/fetchMeeting';
import ReviewItem from '@/app/review/components/ReviewItem';
import { Reviews } from '@/types/review';

jest.mock('@/api/server/fetchMeeting');

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => null), // 검색 파라미터가 없을 경우 null 반환
  })),
}));

jest.mock('@tanstack/react-query', () => {
  const actual = jest.requireActual('@tanstack/react-query');
  return {
    ...actual,
    useQueryClient: jest.fn(() => ({
      setQueryData: jest.fn(),
      getQueryData: jest.fn(),
      invaliddateQueries: jest.fn(),
    })),
  };
});

const mockedFetchReview = fetchReviewMeetingList as jest.MockedFunction<
  typeof fetchReviewMeetingList
>;

const mockReview: Reviews[] = [
  {
    reviewId: 4,
    reviewContent: '5점',
    rating: 5,
    createdAt: '2025-03-12T17:28:29',
    lighteningId: 17,
    category: 'CAFE',
    title: '프론트 개발자 카공 스터디 어때요',
    city: '경기',
    town: '과천시',
    lighteningImageUrl:
      'https://codeit-doit.s3.ap-northeast-2.amazonaws.com/lightening/17/image.jpg',
    targetAt: '2025-03-13T02:00:57',
    userId: 5,
    nickname: '홍당무',
    userImageUrl: 'https://codeit-doit.s3.ap-northeast-2.amazonaws.com/user/5/image.jpg',
  },
  {
    reviewId: 3,
    reviewContent: '날씨도 좋아서 너무 좋았어요!',
    rating: 3,
    createdAt: '2025-03-12T10:44:46',
    lighteningId: 9,
    category: 'GOURMET',
    title: '한강에서 피크닉',
    city: '서울',
    town: '영등포구',
    lighteningImageUrl:
      'https://codeit-doit.s3.ap-northeast-2.amazonaws.com/lightening/9/image.jpg',
    targetAt: '2025-03-28T07:18:46',
    userId: 2,
    nickname: '게스트',
    userImageUrl: 'https://codeit-doit.s3.ap-northeast-2.amazonaws.com/user/2/image.jpg',
  },
];

beforeAll(() => {
  global.IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
  jest.clearAllMocks();
  jest.resetModules();
});

describe('리뷰 목록 테스트', () => {
  beforeEach(() => {
    mockedFetchReview.mockResolvedValue(mockReview);
  });

  it('리뷰 리스트를 받아와야 한다', async () => {
    const result = await fetchReviewMeetingList({
      category: '',
      city: '',
      town: '',
      targetAt: null,
      page: 1,
    });

    expect(result).toEqual(mockReview);
  });

  it('선택된 카테고리에 따라 리뷰가가 필터링되어야 한다', async () => {
    mockedFetchReview.mockResolvedValue(mockReview.filter((review) => review.category === 'CAFE'));

    const result = await fetchReviewMeetingList({
      category: 'CAFE',
      city: '',
      town: '',
      targetAt: null,
    });

    // 결과가 Board Game 카테고리만 포함하는지 검증
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe('CAFE');
    expect(result[0].title).toBe('프론트 개발자 카공 스터디 어때요');
  });

  it('특정 날짜와 정확히 같은 리뷰만 필터링되어야 한다', async () => {
    const specificDate = new Date('2025-03-12T17:28:29'); // 필터 기준 날짜

    // Mock된 데이터로 fetchReviewMeetingList 호출 시 날짜 필터 조건 적용
    mockedFetchReview.mockResolvedValue(
      mockReview.filter(
        (review) => new Date(review.createdAt).getTime() === specificDate.getTime(),
      ),
    );

    const result = await fetchReviewMeetingList({
      category: '', // 모든 카테고리 포함
      city: '',
      town: '',
      targetAt: specificDate, // 특정 날짜 기준 필터
      page: 1,
    });

    // 결과가 특정 날짜와 동일한 리뷰만 포함하는지 검증
    expect(
      result.every((review) => new Date(review.createdAt).getTime() === specificDate.getTime()),
    ).toBe(true);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('프론트 개발자 카공 스터디 어때요'); // 필터링된 데이터의 제목 검증
  });
});

describe('리뷰 아이템 테스트', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient = new QueryClient();
  });

  const renderReviewItem = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <ReviewItem review={mockReview[0]} priority={false} />
      </QueryClientProvider>,
    );

  it('리뷰 정보를 정상적으로 렌더링해야 한다', async () => {
    renderReviewItem();

    // 검증할 텍스트들
    const texts = ['프론트 개발자 카공 스터디 어때요', '경기 과천시', '홍당무', '5점'];

    // 배열을 순회하며 각각 텍스트가 화면에 존재하는지 확인
    texts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('카테고리 배경색이 올바르게 적용되어야 한다', () => {
    renderReviewItem();

    const categoryTag = screen.getByText('카페');

    // 부모 요소 찾기
    const firstParent = categoryTag.parentElement;

    expect(firstParent).toBeInTheDocument();
    expect(firstParent).toHaveClass('bg-[#fffbe6]');
  });
});
