import axiosInstance from '../api';

const toggleLike = async (meetingId: string) => {
  try {
    await axiosInstance.post(`/api/v1/lightenings/${meetingId}/like`);
    console.log('서버에 좋아요 상태 반영');
  } catch (error) {
    console.error('서버에 요청 실패', error);
  }
};

export default toggleLike;
