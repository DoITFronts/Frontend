import useProfileStore from '@/store/useProfileStore';
import axiosInstance from '../api';
import categoryMap from '@/types/categoryMap';

interface FetchMyPageMeetingsParams {
  type: string; // '나의 번개' | '내가 만든 번개'
  category?: string; // '술' | '카페' | '보드 게임' | '맛집'
}

const CATEGORY_MAP = {
  술: 'ALCOHOL',
  카페: 'CAFE',
  '보드 게임': 'BOARD_GAME',
  맛집: 'RESTAURANT',
};

export const fetchProfile = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/my-page/user');
    useProfileStore.getState().setInitialProfile(response.data);
    return response.data;
  } catch (error) {
    console.error('프로필 정보를 불러오는데 실패했습니다.: ', error);
  }
};

export const fetchMyPageMeetings = async ({ type, category }: FetchMyPageMeetingsParams) => {
  try {
    const englishCategory = category ? categoryMap[category] || 'ALCOHOL' : 'ALCOHOL';
    const params = { category: englishCategory };

    const response = await axiosInstance.get('/api/v1/my-page/lightenings/created', { params });
    return response.data;
  } catch (error) {
    console.error('내가 만든 번개 목록을 불러오는데 실패했습니다.: ', error);
  }
};

export const fetchMyPageReviews = async () => {
  const response = await fetch('/api/mypage/reviews');

  if (!response.ok) throw new Error(`API Error: ${response.status}`);

  return response.json();
};
