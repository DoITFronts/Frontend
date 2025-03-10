import axiosInstance from '@/api/api';

const fetchDetailReview = async (meetingId: string) => {
  try {
    const response = await axiosInstance.get(`/api/v1/lightenings/${meetingId}/reviews`);

    const meetingData = response.data;

    if (!meetingData) {
      console.error('Invalid response structure:', response.data);
      throw new Error('Invalid response format');
    }

    return meetingData;
  } catch (error) {
    console.error('Error fetching meeting details:', error);
    throw error;
  }
};

export default fetchDetailReview;
