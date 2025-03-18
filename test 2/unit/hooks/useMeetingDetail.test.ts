import { jest, expect } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';

import fetchMeetingById from '@/api/meeting/fetchMeetingById';
import { useMeetingDetail, useMeetingEditor } from '@/hooks/useMeetingDetail';
import { MeetingCategory, MeetingDetail } from '@/types/meeting';

jest.mock('@/api/meeting/fetchMeetingById');

const mockedFetchMeetingById = fetchMeetingById as jest.MockedFunction<typeof fetchMeetingById>;

describe('useMeetingDetail', () => {
  it('초기 데이터를 받아와야 한다', async () => {
    const mockMeeting: MeetingDetail = {
      id: '17',
      category: MeetingCategory.CAFE,
      address: '경기 과천시 주암동 685',
      city: '경기',
      town: '과천시',
      placeName: '렛츠런파크서울 포니랜드',
      latitude: '37.4469967820368',
      longitude: '127.015997665812',
      targetAt: '2025-03-13T02:00:57',
      endAt: '2025-03-12T06:55:57',
      title: '프론트 개발자 카공 스터디 어때요',
      summary: '과천에서 프론트엔드 개발자 분들과 함께 스터디를 진행해보려고 합니다~ ',
      description: 'testing',
      imageUrl: 'https://codeit-doit.s3.ap-northeast-2.amazonaws.com/lightening/17/image.jpg',
      isLiked: false,
      isJoined: false,
      capacity: 7,
      minCapacity: 3,
      participantCount: 1,
      isConfirmed: false,
      isCompleted: false,
      chatRoomId: 17,
      participants: [
        {
          lighteningId: 17,
          userId: 4,
          email: 'serachoi@ajou.ac.kr',
          name: '최승은',
          description: '코딩 너무 스트레스 받아요 번개로 힐링하고 싶어요!',
          image: 'https://codeit-doit.s3.ap-northeast-2.amazonaws.com/user/4/image.jpg',
          isHost: true,
        },
      ],
    };
    mockedFetchMeetingById.mockResolvedValue(mockMeeting);

    const { result } = renderHook(() => useMeetingDetail(mockMeeting));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.data).toEqual(mockMeeting));
    expect(result.current.isLoading).toBe(false);
  });

  it('meetingId가 없으면 데이터가 null이어야 한다', () => {
    const { result } = renderHook(() => useMeetingDetail());

    expect(result.current.meetingId).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it('API 요청 실패 시 error가 설정되어야 한다', async () => {
    mockedFetchMeetingById.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useMeetingDetail());

    await waitFor(() => expect(result.current.error).toBeDefined());
  });
});

describe('useMeetingEditor', () => {
  it('초기 상태가 올바르게 설정되어야 한다', () => {
    const { result } = renderHook(() => useMeetingEditor('초기 설명'));

    expect(result.current.isEditing).toBe(false);
    expect(result.current.status).toBe('default');
    expect(result.current.description).toBe('초기 설명');
    expect(result.current.tab).toBe('edit');
  });

  it('isEditing을 변경할 수 있어야 한다', () => {
    const { result } = renderHook(() => useMeetingEditor(''));

    act(() => {
      result.current.setIsEditing(true);
    });

    expect(result.current.isEditing).toBe(true);
  });

  it('description을 변경할 수 있어야 한다', () => {
    const { result } = renderHook(() => useMeetingEditor(''));

    act(() => {
      result.current.setDescription('새로운 설명');
    });

    expect(result.current.description).toBe('새로운 설명');
  });

  it('탭을 변경할 수 있어야 한다', () => {
    const { result } = renderHook(() => useMeetingEditor(''));

    act(() => {
      result.current.setTab('preview');
    });

    expect(result.current.tab).toBe('preview');
  });
});
