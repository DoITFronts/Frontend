import useProfileStore from '@/store/useProfileStore';
import axiosInstance from '../api';

interface FetchMyPageMeetingsParams {
  type: string; // '나의 번개' | '내가 만든 번개'
  category?: string; // '술' | '카페' | '보드 게임' | '맛집'
}

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
  const queryParams = new URLSearchParams({
    type,
    ...(category && { category }),
  }).toString();

  const response = await fetch(`/api/v1/lightenings`);

  if (!response.ok) throw new Error(`API Error: ${response.status}`);

  return response.json();
};

export const fetchMyPageReviews = async () => {
  const response = await fetch('/api/mypage/reviews');

  if (!response.ok) throw new Error(`API Error: ${response.status}`);

  return response.json();
};
