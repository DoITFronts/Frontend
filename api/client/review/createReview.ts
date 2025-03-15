import axiosInstance from '@/api/middleware/api';

const createReview = async (meetingId: string, content: string, score: number) => {
  try {
    const response = await axiosInstance.post(`/api/v1/lightenings/${meetingId}/reviews`, {
      content,
      score,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw new Error('리뷰를 작성하는 중 오류가 발생했습니다.');
  }
};

export default createReview;
