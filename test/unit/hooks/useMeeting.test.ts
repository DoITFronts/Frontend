import { expect } from '@jest/globals';
import { waitFor } from '@testing-library/dom';

import { fetchMeetingList } from '@/api/meeting/fetchMeeting';
import { MeetingCategory, Meeting } from '@/types/meeting';

jest.mock('@/api/meeting/fetchMeeting');

const mockedFetchMeeting = fetchMeetingList as jest.MockedFunction<typeof fetchMeetingList>;

console.log(mockedFetchMeeting);

const mockMeeting: Meeting[] = [
  {
    id: '32',
    category: MeetingCategory.BOARD_GAME,
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
    participantCount: 1,
    isConfirmed: false,
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
];

describe('fetchMeetingList', () => {
  it('모임 리스트를 받아와야 한다', async () => {
    mockedFetchMeeting.mockResolvedValue(mockMeeting);

    const result = await fetchMeetingList({
      category: MeetingCategory.BOARD_GAME,
      city: '경기',
      town: '과천시',
      targetAt: new Date('2025-03-15T05:18:00'),
      page: 1,
    });

    expect(result).toHaveBeenCalledTimes(1);

    expect(result).toEqual(mockMeeting);
  });

  it('모임 리스트를 정상적으로 렌더링해야 한다.', async () => {});
});
