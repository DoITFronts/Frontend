import { Meeting } from '@/types/meeting.types';

const mockMeetings: Meeting[] = [
  {
    id: "0",
    category: '술',
    title: '경기 성남시에서 진행하는 어쩌구',
    targetAt: '2025-02-11T04:00:57.498Z',
    date: '2025-02-11',
    city: '성남시',
    town: '경기',
    participantCount: 18,
    capacity: 20,
    imageUrl: 'https://codeit-doit.s3.ap-northeast-2.amazonaws.com/lightening/5/image.jpg',
    description:
      '성남시에서 즐거운 술 모임! 성남시에서 즐거운 술 모임! 성남시에서 즐거운 술 모임! 성남시에서 즐거운 술 모임! 성남시에서 즐거운 술 모임! 성남시에서 즐거운 술 모임! 성남시에서 즐거운 술 모임! 성남시에서 즐거운 술 모임! 성남시에서 즐거운 술 모임! 성남시에서 즐거운 술 모임! 성남시에서 즐거운 술 모임! ',
    isLiked: false,
    isConfirmed: true,
    isJoined: true,
    isCompleted: false,
    participants: [
      {
        userId: 100,
        name: '홍길동',
        isHost: true,
      },
    ],
    summary: '성남시에서 즐거운 술 모임! ...',
  },
  {
    id: "1",
    category: '술',
    title: '동작구 동작그만 ㅋㅋㅋ',
    targetAt: '2025-02-11T04:00:57.498Z',
    date: '2025-02-11',
    city: '동작구',
    town: '서울',
    participantCount: 5,
    capacity: 10,
    imageUrl: 'string',
    description: '유쾌한 동작구 술자리!',
    isLiked: true,
    isConfirmed: false,
    isCompleted: true,
    participants: [
      {
        userId: 101,
        name: '김철수',
        isHost: true,
      },
    ],
    summary: '유쾌한 동작구 술자리!',
    isJoined: false,
  },
  {
    id: "2",
    category: '술',
    title: '서울 강남구에서 열리는 행사1',
    targetAt: '2025-02-11T05:00:57.498Z',
    date: '2025-02-11',
    city: '강남구',
    town: '서울',
    participantCount: 8,
    capacity: 15,
    imageUrl: 'string',
    description: '강남에서 핫한 술 모임!',
    isLiked: true,
    isConfirmed: true,
    isCompleted: false,
    participants: [
      {
        userId: 102,
        name: '이영희',
        isHost: true,
      },
    ],
    summary: '강남에서 핫한 술 모임!',
    isJoined: false,
  },
  {
    id: "3",
    category: '술',
    title: '서울 강서구에서 열리는 행사2',
    targetAt: '2025-02-11T06:00:57.498Z',
    date: '2025-02-11',
    city: '강서구',
    town: '서울',
    participantCount: 12,
    capacity: 20,
    imageUrl: 'string',
    description: '강서구에서 시원한 술 한잔!',
    isLiked: false,
    isConfirmed: false,
    isCompleted: true,
    participants: [
      {
        userId: 103,
        name: '박지성',
        isHost: true,
      },
    ],
    summary: '강서구에서 시원한 술 한잔!',
    isJoined: false,
  },
  {
    id: "4",
    category: '술',
    title: '경기 고양시에서 열리는 행사3',
    targetAt: '2025-02-12T07:00:57.498Z',
    date: '2025-02-12',
    city: '고양시',
    town: '경기',
    participantCount: 7,
    capacity: 15,
    imageUrl: 'string',
    description: '고양시에서 즐기는 술 파티!',
    isLiked: true,
    isConfirmed: true,
    isCompleted: false,
    participants: [
      {
        userId: 104,
        name: '최미나',
        isHost: true,
      },
    ],
    summary: '고양시에서 즐기는 술 파티!',
    isJoined: false,
  },
  {
    id: "5",
    category: '카페',
    title: '서울 마포구에서 열리는 행사4',
    targetAt: '2025-02-12T08:00:57.498Z',
    date: '2025-02-12',
    city: '마포구',
    town: '서울',
    participantCount: 20,
    capacity: 20,
    imageUrl: 'string',
    description: '마포 감성 카페 모임!',
    isLiked: false,
    isConfirmed: false,
    isCompleted: true,
    participants: [
      {
        userId: 105,
        name: '정민수',
        isHost: true,
      },
    ],
    summary: '마포 감성 카페 모임!',
    isJoined: false,
  },
  {
    id: "6",
    category: '카페',
    title: '서울 송파구에서 열리는 행사5',
    targetAt: '2025-02-11T09:00:57.498Z',
    date: '2025-02-11',
    city: '송파구',
    town: '서울',
    participantCount: 5,
    capacity: 10,
    imageUrl: 'string',
    description: '송파 힐링 카페 투어!',
    isLiked: true,
    isConfirmed: false,
    isCompleted: true,
    participants: [
      {
        userId: 106,
        name: '강수진',
        isHost: true,
      },
    ],
    summary: '송파 힐링 카페 투어!',
    isJoined: false,
  },
  {
    id: "7",
    category: '카페',
    title: '경기 수원시에서 열리는 행사6',
    targetAt: '2025-02-11T10:00:57.498Z',
    date: '2025-02-11',
    city: '수원시',
    town: '경기',
    participantCount: 13,
    capacity: 20,
    imageUrl: 'string',
    description: '수원의 숨겨진 카페 발견!',
    isLiked: false,
    isConfirmed: false,
    isCompleted: true,
    participants: [
      {
        userId: 107,
        name: '윤도현',
        isHost: true,
      },
    ],
    summary: '수원의 숨겨진 카페 발견!',
    isJoined: false,
  },
  {
    id: "8",
    category: '카페',
    title: '서울 용산구에서 열리는 행사7',
    targetAt: '2025-02-12T11:00:57.498Z',
    date: '2025-02-12',
    city: '용산구',
    town: '서울',
    participantCount: 6,
    capacity: 10,
    imageUrl: 'string',
    description: '용산 핫플레이스 카페 탐방!',
    isLiked: true,
    isConfirmed: false,
    isCompleted: true,
    participants: [
      {
        userId: 108,
        name: '송혜교',
        isHost: true,
      },
    ],
    summary: '용산 핫플레이스 카페 탐방!',
    isJoined: false,
  },
  {
    id: "9",
    category: '카페',
    title: '경기 안산시에서 열리는 행사8',
    targetAt: '2025-02-11T12:00:57.498Z',
    date: '2025-02-11',
    city: '안산시',
    town: '경기',
    participantCount: 15,
    capacity: 20,
    imageUrl: 'string',
    description: '안산 분위기 좋은 카페에서!',
    isLiked: false,
    isConfirmed: false,
    isCompleted: true,
    participants: [
      {
        userId: 109,
        name: '유재석',
        isHost: true,
      },
    ],
    summary: '안산 분위기 좋은 카페에서!',
    isJoined: false,
  },
  {
    id: "10",
    category: '카페',
    title: '서울 구로구에서 열리는 행사9',
    targetAt: '2025-02-12T13:00:57.498Z',
    date: '2025-02-12',
    city: '구로구',
    town: '서울',
    participantCount: 7,
    capacity: 15,
    imageUrl: 'string',
    description: '구로 조용한 카페에서 힐링!',
    isLiked: true,
    isConfirmed: true,
    isCompleted: false,
    participants: [
      {
        userId: 110,
        name: '김태희',
        isHost: true,
      },
    ],
    summary: '구로 조용한 카페에서 힐링!',
    isJoined: false,
  },
  {
    id: "11",
    category: '보드게임',
    title: '서울 서초구에서 열리는 행사10',
    targetAt: '2025-02-12T14:00:57.498Z',
    date: '2025-02-12',
    city: '서초구',
    town: '서울',
    participantCount: 4,
    capacity: 10,
    imageUrl: 'string',
    description: '서초 보드게임 매니아 모여라!',
    isLiked: false,
    isConfirmed: false,
    isCompleted: true,
    participants: [
      {
        userId: 111,
        name: '이민호',
        isHost: true,
      },
    ],
    summary: '서초 보드게임 매니아 모여라!',
    isJoined: false,
  },
  {
    id: "12",
    category: '맛집',
    title: '경기 부천시에서 열리는 행사11',
    targetAt: '2025-02-12T15:00:57.498Z',
    date: '2025-02-13',
    city: '부천시',
    town: '경기',
    participantCount: 9,
    capacity: 15,
    imageUrl: 'string',
    description: '부천 맛집 탐험대!',
    isLiked: true,
    isConfirmed: true,
    isCompleted: false,
    participants: [
      {
        userId: 112,
        name: '박신혜',
        isHost: true,
      },
    ],
    summary: '부천 맛집 탐험대!',
    isJoined: false,
  },
  {
    id: "13",
    category: '맛집',
    title: '서울 성북구에서 열리는 행사12',
    targetAt: '2025-02-12T16:00:57.498Z',
    date: '2025-02-13',
    city: '성북구',
    town: '서울',
    participantCount: 10,
    capacity: 15,
    imageUrl: 'string',
    description: '성북구 숨은 맛집 찾기!',
    isLiked: false,
    isConfirmed: false,
    isCompleted: true,
    participants: [
      {
        userId: 113,
        name: '조인성',
        isHost: true,
      },
    ],
    summary: '성북구 숨은 맛집 찾기!',
    isJoined: false,
  },
  {
    id: "14",
    category: '맛집',
    title: '경기 화성시에서 열리는 행사13',
    targetAt: '2025-02-11T17:00:57.498Z',
    date: '2025-02-12',
    city: '화성시',
    town: '경기',
    participantCount: 6,
    capacity: 10,
    imageUrl: 'string',
    description: '화성 맛집 정복!',
    isLiked: true,
    isConfirmed: false,
    isCompleted: true,
    participants: [
      {
        userId: 114,
        name: '한지민',
        isHost: true,
      },
    ],
    summary: '화성 맛집 정복!',
    isJoined: false,
  },
  {
    id: "15",
    category: '맛집',
    title: '서울 양천구에서 열리는 행사14',
    targetAt: '2025-02-12T18:00:57.498Z',
    date: '2025-02-13',
    city: '양천구',
    town: '서울',
    participantCount: 5,
    capacity: 10,
    imageUrl: 'string',
    description: '양천구 맛집 털기!',
    isLiked: false,
    isConfirmed: false,
    isCompleted: true,
    participants: [
      {
        userId: 115,
        name: '장동건',
        isHost: true,
      },
    ],
    summary: '양천구 맛집 털기!',
    isJoined: false,
  },
  {
    id: "16",
    category: '맛집',
    title: '경기 평택시에서 열리는 행사15',
    targetAt: '2025-02-11T19:00:57.498Z',
    date: '2025-02-12',
    city: '평택시',
    town: '경기',
    participantCount: 12,
    capacity: 20,
    imageUrl: 'string',
    description: '평택 현지인 추천 맛집!',
    isLiked: true,
    isConfirmed: false,
    isCompleted: true,
    participants: [
      {
        userId: 116,
        name: '전지현',
        isHost: true,
      },
    ],
    summary: '평택 현지인 추천 맛집!',
    isJoined: false,
  },
  {
    id: "17",
    category: '보드게임',
    title: '서울 강동구에서 열리는 행사16',
    targetAt: '2025-02-11T20:00:57.498Z',
    date: '2025-02-12',
    city: '강동구',
    town: '서울',
    participantCount: 14,
    capacity: 20,
    imageUrl: 'string',
    description: '강동 보드게임 고수들의 만남!',
    isLiked: false,
    isConfirmed: false,
    isCompleted: true,
    participants: [
      {
        userId: 117,
        name: '권상우',
        isHost: true,
      },
    ],
    summary: '강동 보드게임 고수들의 만남!',
    isJoined: false,
  },
  {
    id: "18",
    category: '보드게임',
    title: '경기 의정부시에서 열리는 행사17',
    targetAt: '2025-02-11T21:00:57.498Z',
    date: '2025-02-12',
    city: '의정부시',
    town: '경기',
    participantCount: 19,
    capacity: 20,
    imageUrl: 'string',
    description: '의정부 보드게임 한판 승부!',
    isLiked: true,
    isConfirmed: false,
    isCompleted: true,
    participants: [
      {
        userId: 118,
        name: '손예진',
        isHost: true,
      },
    ],
    summary: '의정부 보드게임 한판 승부!',
    isJoined: false,
  },
  {
    id: "19",
    category: '보드게임',
    title: '서울 노원구에서 열리는 행사18',
    targetAt: '2025-02-11T22:00:57.498Z',
    date: '2025-02-12',
    city: '노원구',
    town: '서울',
    participantCount: 9,
    capacity: 15,
    imageUrl: 'string',
    description: '노원 보드게임 친목 모임!',
    isLiked: false,
    isConfirmed: false,
    isCompleted: true,
    participants: [
      {
        userId: 119,
        name: '원빈',
        isHost: true,
      },
    ],
    summary: '노원 보드게임 친목 모임!',
    isJoined: false,
  },
];

export default mockMeetings;
