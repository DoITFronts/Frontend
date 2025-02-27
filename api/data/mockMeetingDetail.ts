import { MeetingDetail } from '@/types/meeting';

const mockMeetings: {
  code: number;
  isSuccess: boolean;
  message: string;
  result: { success: boolean; code: number; message: string; data: MeetingDetail };
}[] = [
  {
    code: 200,
    isSuccess: true,
    message: '모임 상세 조회 성공',
    result: {
      success: true,
      code: 4010,
      message: '모임 상세 조회에 성공했습니다.',
      data: {
        id: '1',
        title: '📖 번개 1 - 함께하는 독서',
        category: '카페',
        imageUrl: 'https://coen.store/event1.jpg',
        location: { region_1depth_name: '서울', region_2depth_name: '강남구' },
        datetime: '2025-02-10T18:00:00',
        summary: '이 번개은 책을 좋아하는 사람들을 위한 번개입니다!',
        isLiked: true,
        maxParticipants: 12,
        currentParticipants: 5,
        host: {
          id: '101',
          name: '책덕후 호스트',
          profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        participants: [
          {
            id: '1',
            name: '조용한 나무늘보',
            profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
          },
          {
            id: '2',
            name: '깊은 생각하는 너구리',
            profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
          },
        ],
        details: {
          title: '번개 1 - 상세 정보',
          description: `
## 함께하는 독서 번개!
같은 책을 읽고 이야기를 나누는 독서 번개입니다. 📚  
각자 추천하는 책을 가져와서 공유하는 시간도 있어요!

### 📍 추천 대상
- ✅ 책 읽는 걸 좋아하는 분
- ✅ 조용한 분위기에서 대화하는 걸 선호하는 분

☕ **번개 장소: 강남 북카페**  
따뜻한 커피 한 잔과 함께 책 속으로 떠나요! 🚀
          `,
        },
        reviews: [
          {
            id: '1',
            writer: '귀여운 사슴',
            profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
            content: '너무 좋은 번개이었어요! 다시 참여하고 싶어요.',
            date: '2025-02-11',
            count: 4,
          },
          {
            id: '2',
            writer: '씩씩한 고양이',
            profileImage: 'https://randomuser.me/api/portraits/men/5.jpg',
            content: '책을 읽으면서 대화하는 시간이 너무 좋았어요.',
            date: '2025-02-11',
            count: 3,
          },
          {
            id: '3',
            writer: '느긋한 거북이',
            profileImage: 'https://randomuser.me/api/portraits/men/7.jpg',
            content: '다들 너무 친절하고 좋은 분들이었어요.',
            date: '2025-02-11',
            count: 5,
          },
          {
            id: '4',
            writer: '고민 많은 판다',
            profileImage: 'https://randomuser.me/api/portraits/w/4.jpg',
            content: '책을 읽으면서 대화하는 시간이 너무 좋았어요.',
            date: '2025-02-11',
            count: 3,
          },
          {
            id: '5',
            writer: '장난꾸러기 다람쥐',
            profileImage: 'https://randomuser.me/api/portraits/w/5.jpg',
            content: '다들 너무 친절하고 좋은 분들이었어요.',
            date: '2025-02-11',
            count: 5,
          },
          {
            id: '6',
            writer: '생각 깊은 올빼미',
            profileImage: 'https://randomuser.me/api/portraits/w/6.jpg',
            content: '책을 읽으면서 대화하는 시간이 너무 좋았어요.',
            date: '2025-02-11',
            count: 3,
          },
          {
            id: '7',
            writer: '조용한 나무늘보',
            profileImage: 'https://randomuser.me/api/portraits/w/1.jpg',
            content: '다들 너무 친절하고 좋은 분들이었어요.',
            date: '2025-02-11',
            count: 5,
          },
        ],
      },
    },
  },
  {
    code: 200,
    isSuccess: true,
    message: '모임 상세 조회 성공',
    result: {
      success: true,
      code: 4010,
      message: '번개 상세 조회에 성공했습니다.',
      data: {
        id: '2',
        title: '🍺 번개 2 - 소맥의 밤',
        category: '술',
        imageUrl: 'https://coen.store/event2.jpg',
        location: { region_1depth_name: '부산', region_2depth_name: '해운대구' },
        datetime: '2025-02-15T19:30:00',
        summary: '소맥을 사랑하는 사람들과 함께하는 즐거운 술자리!',
        isLiked: false,
        maxParticipants: 8,
        currentParticipants: 6,
        host: {
          id: '102',
          name: '맥주 매니아',
          profileImage: 'https://randomuser.me/api/portraits/men/4.jpg',
        },
        participants: [
          {
            id: '3',
            name: '신나는 강아지',
            profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
          },
          {
            id: '4',
            name: '고민 많은 판다',
            profileImage: 'https://randomuser.me/api/portraits/women/4.jpg',
          },
        ],
        details: {
          title: '소맥의 밤 - 상세 정보',
          description: `
## 함께하는 소맥의 밤!
소맥을 만들고 맛있게 마시면서 친해지는 술자리 번개입니다! 🍻

### 📍 추천 대상
- ✅ 술을 좋아하는 분
- ✅ 새로운 사람들과 친목을 쌓고 싶은 분

🍺 **번개 장소: 해운대 유명 펍**  
시원한 맥주와 함께하는 소셜 네트워킹 타임! 🚀
          `,
        },
        reviews: [
          {
            id: '2',
            writer: '씩씩한 고양이',
            profileImage: 'https://randomuser.me/api/portraits/men/5.jpg',
            content: '술도 좋고, 사람들도 너무 좋았어요!',
            date: '2025-02-16',
            count: 3,
          },
        ],
      },
    },
  },
  {
    code: 200,
    isSuccess: true,
    message: '모임 상세 조회 성공',
    result: {
      success: true,
      code: 4010,
      message: '번개 상세 조회에 성공했습니다.',
      data: {
        id: '3',
        title: '🎲 번개 3 - 보드게임의 밤',
        category: '보드게임',
        imageUrl: 'https://coen.store/event3.jpg',
        location: { region_1depth_name: '대전', region_2depth_name: '서구' },
        datetime: '2025-02-18T17:00:00',
        summary: '전략부터 파티 게임까지! 보드게임을 좋아하는 사람들을 위한 번개입니다.',
        isLiked: true,
        maxParticipants: 10,
        currentParticipants: 7,
        host: {
          id: '103',
          name: '보드게임 마스터',
          profileImage: 'https://randomuser.me/api/portraits/men/6.jpg',
        },
        participants: [
          {
            id: '5',
            name: '장난꾸러기 다람쥐',
            profileImage: 'https://randomuser.me/api/portraits/women/5.jpg',
          },
          {
            id: '6',
            name: '생각 깊은 올빼미',
            profileImage: 'https://randomuser.me/api/portraits/women/6.jpg',
          },
        ],
        details: {
          title: '보드게임의 밤 - 상세 정보',
          description: `
## 보드게임과 함께하는 즐거운 시간! 🎲
전략적인 게임부터 가벼운 파티 게임까지! 다양한 보드게임을 즐겨요.

### 📍 추천 대상
- ✅ 보드게임을 좋아하는 분
- ✅ 다양한 게임을 배우고 싶은 분

🎮 **번개 장소: 대전 보드게임 카페**  
승패를 떠나 다 같이 즐거운 시간이 될 거예요! 🚀
          `,
        },
        reviews: [
          {
            id: '3',
            writer: '느긋한 거북이',
            profileImage: 'https://randomuser.me/api/portraits/men/7.jpg',
            content: '게임 종류가 다양해서 너무 좋았어요!',
            date: '2025-02-19',
            count: 5,
          },
        ],
      },
    },
  },
];

export default mockMeetings;
