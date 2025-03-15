import axiosInstance from '../../middleware/api';

const toggleLike = async (meetingId: string) => {
  try {
    await axiosInstance.post(`/api/v1/lightenings/${meetingId}/like`);
  } catch (error) {
    console.error('서버에 요청 실패', error);
  }
};

export default toggleLike;