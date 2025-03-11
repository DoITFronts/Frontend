import useProfileStore from '@/store/useProfileStore';
import axiosInstance from '../api';
import categoryMap from '@/types/categoryMap';

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

export const updateProfile = async (
  data: { nickname?: string; description?: string },
  imageFile?: File | null,
) => {
  try {
    const formData = new FormData();
    if (data.nickname) formData.append('nickname', data.nickname);
    if (data.description) formData.append('description', data.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    const response = await axiosInstance.post('/api/v1/my-page/user', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const profileResponse = await axiosInstance.get('/api/v1/my-page/user');
    useProfileStore.getState().setInitialProfile(profileResponse.data);
    return response.data;
  } catch (error) {
    console.error('프로필 정보 수정에 실패했습니다.: ', error);
  }
};

export const fetchMyPageMeetings = async ({ type, category }: FetchMyPageMeetingsParams) => {
  try {
    const params: Record<string, string> = {};
    if (category) {
      params.category = categoryMap[category] || 'ALCOHOL';
    }

    const basePath = '/api/v1/my-page/lightenings';
    let endPoint;

    if (type === '나의 번개') {
      endPoint = `${basePath}/joined`;
    } else if (type === '내가 만든 번개') {
      endPoint = `${basePath}/created`;
    } else {
      endPoint = `${basePath}/joined`;
    }

    const response = await axiosInstance.get(endPoint, { params });
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
