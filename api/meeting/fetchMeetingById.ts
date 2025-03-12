import axiosInstance from '@/api/api';

const fetchMeetingById = async (id: string | undefined) => {
  if (!id) {
    throw new Error('Invalid event ID');
  }

  try {
    const response = await axiosInstance.get(`/api/v1/lightenings/${id}`);

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

export default fetchMeetingById;
