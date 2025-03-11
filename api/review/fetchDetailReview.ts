import axiosInstance from '@/api/api';

const fetchDetailReview = async (meetingId: string) => {
  try {
    const response = await axiosInstance.get(`/api/v1/lightenings/${meetingId}/reviews`, {
    });

    if (!response.data || !response.data.reviews) {
      console.error('Invalid response structure:', response.data);
      throw new Error('Invalid response format');
    }

    return response.data.reviews;
  } catch (error) {
    console.error('Error fetching meeting reviews:', error);
    throw error;
  }
};

export default fetchDetailReview;
