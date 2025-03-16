import { expect } from '@jest/globals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { fetchMeetingList } from '@/api/server/fetchMeeting';
import CardItem from '@/components/ui/card/CardItem';
import { Meeting } from '@/types/meeting/meeting';

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
    useMutation: jest.fn(() => ({
      mutate: jest.fn(),
    })),
  };
});

jest.mock('@/hooks/like/useLikeToggle', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    isLiked: false,
    handleLikeClick: jest.fn(),
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

jest.mock('@/components/ui/button/Button', () => ({
  __esModule: true,
  default: jest.fn(({ onClick, children }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  )),
}));

jest.mock('@/components/ui/card/component/MeetingStatus', () => ({
  __esModule: true,
  default: jest.fn(({ participantCount, capacity, isConfirmed, isCompleted }) => (
    <div>
      {participantCount}/{capacity} {isConfirmed ? '개설 확정' : ''}
      {isCompleted ? '마감' : '참여하기'}
    </div>
  )),
}));

jest.mock('@/components/ui/modal/variants/DeleteMeetingModal', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Delete Modal</div>),
}));

const mockedFetchMeeting = fetchMeetingList as jest.MockedFunction<typeof fetchMeetingList>;

const mockMeeting: Meeting[] = [
  {
    id: '32',
    category: 'BOARD_GAME',
    city: '경기',
    town: '과천시',
    targetAt: '2025-03-15T05:18:00',
    endAt: '2025-03-14T05:18:00.086',
    title: '스플랜더 잘하시는 분들',
    summary: '심심한데 과천에서 포켓캠프 합시당!!',
    imageUrl: 'https://codeit-doit.s3.ap-northeast-2.amazonaws.com/lightening/32/image.jpg',
    isLiked: false,
    isJoined: false,
    capacity: 6,
    minCapacity: 3,
    participantCount: 3,
    isConfirmed: true,
    isCompleted: false,
    chatRoomId: 32,
    participants: [
      {
        lighteningId: 32,
        userId: 4,
        email: 'serachoi@ajou.ac.kr',
        name: '최승은',
        description: '코딩 너무 스트레스 받아요 번개로 힐링하고 싶어요!',
        image: 'https://codeit-doit.s3.ap-northeast-2.amazonaws.com/user/4/image.jpg',
        isHost: true,
      },
    ],
  },
  {
    id: '34',
    category: 'CAFE',
    city: '경기',
    town: '김포시',
    targetAt: '2025-03-20T16:16:05',
    endAt: '2025-03-18T16:16:05',
    title: '모각코',
    summary: '신나게 코딩해봐요',
    imageUrl: 'https://codeit-doit.s3.ap-northeast-2.amazonaws.com/lightening/34/image.jpg',
    isLiked: false,
    isJoined: false,
    capacity: 5,
    minCapacity: 3,
    participantCount: 1,
    isConfirmed: false,
    isCompleted: false,
    chatRoomId: 34,
    participants: [
      {
        lighteningId: 34,
        userId: 3,
        email: 'guest@gmail.com',
        name: '게스트',
        description: '게스트',
        image: 'https://codeit-doit.s3.ap-northeast-2.amazonaws.com/user/3/image.jpg',
        isHost: true,
      },
    ],
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

describe('모임 목록 테스트', () => {
  beforeEach(() => {
    mockedFetchMeeting.mockResolvedValue(mockMeeting);
  });

  it('모임 리스트를 받아와야 한다', async () => {
    const result = await fetchMeetingList({
      category: '',
      city: '',
      town: '',
      targetAt: null,
    });

    expect(result).toEqual(mockMeeting);
  });

  it('선택된 카테고리에 따라 모임이 필터링되어야 한다', async () => {
    mockedFetchMeeting.mockResolvedValue(
      mockMeeting.filter((meeting) => meeting.category === 'BOARD_GAME'),
    );

    const result = await fetchMeetingList({
      category: 'BOARD_GAME',
      city: '',
      town: '',
      targetAt: null,
    });

    // 결과가 Board Game 카테고리만 포함하는지 검증
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe('BOARD_GAME');
    expect(result[0].title).toBe('스플랜더 잘하시는 분들');
  });

  it('특정 날짜와 정확히 같은 모임만 필터링되어야 한다', async () => {
    const specificDate = new Date('2025-03-15T05:18:00'); // 필터 기준 날짜

    // Mock된 데이터로 fetchMeetingList 호출 시 날짜 필터 조건 적용
    mockedFetchMeeting.mockResolvedValue(
      mockMeeting.filter(
        (meeting) => new Date(meeting.targetAt).getTime() === specificDate.getTime(),
      ),
    );

    const result = await fetchMeetingList({
      category: '', // 모든 카테고리 포함
      city: '',
      town: '',
      targetAt: specificDate, // 특정 날짜 기준 필터
      page: 1,
    });

    // 결과가 특정 날짜와 동일한 모임만 포함하는지 검증
    expect(
      result.every((meeting) => new Date(meeting.targetAt).getTime() === specificDate.getTime()),
    ).toBe(true);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('스플랜더 잘하시는 분들'); // 필터링된 데이터의 제목 검증
  });
});

describe('카드 아이템 테스트', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient = new QueryClient();
  });

  const renderCardItem = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <CardItem meeting={mockMeeting[0]} onClick={jest.fn()} />
      </QueryClientProvider>,
    );

  it('모임 정보를 정상적으로 렌더링해야 한다', async () => {
    renderCardItem();

    // 검증할 텍스트들
    const texts = [
      '스플랜더 잘하시는 분들',
      '경기 과천시',
      '최승은',
      '참여하기',
      '심심한데 과천에서 포켓캠프 합시당!!',
    ];

    // 배열을 순회하며 각각 텍스트가 화면에 존재하는지 확인
    texts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('카테고리 배경색이 올바르게 적용되어야 한다', () => {
    renderCardItem();

    const categoryTag = screen.getByText('보드게임');

    // 부모 요소 찾기
    const firstParent = categoryTag.parentElement;

    expect(firstParent).toBeInTheDocument();
    expect(firstParent).toHaveClass('bg-[#d3e8ff]');
  });

  it('버튼 내용이 초기 버튼 상태와 일치해야 한다', async () => {
    renderCardItem();

    // 초기 버튼 텍스트가 "참여하기"인지 확인
    const button = screen.getByRole('button', { name: '참여하기' });
    expect(button).toBeInTheDocument();
  });
});
