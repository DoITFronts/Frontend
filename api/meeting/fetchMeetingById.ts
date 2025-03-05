import axiosInstance from '@/api/api';

const fetchMeetingById = async (id: string | undefined) => {
  if (!id) {
    throw new Error('Invalid event ID');
  }

  try {
    const response = await axiosInstance.get(`/api/v1/lightenings/${id}`);
    const meetingData = response.data[0]?.result?.data || response.data?.result?.data;

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