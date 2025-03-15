import axiosInstance from '@/api/middleware/api';

const fetchMeetingById = async (id: string | undefined) => {
  if (!id) {
    throw new Error('Invalid event ID');
  }

  try {
    const response = await axiosInstance.get(`/api/v1/lightenings/${id}`);

    const meetingData = response.data;

    if (!meetingData) {
      throw new Error('Invalid response format');
    }

    return meetingData;
  } catch (error) {
    throw error;
  }
};

export default fetchMeetingById;
