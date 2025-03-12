import axiosInstance from '@/api/api';

interface UpdateMeetingDescriptionParams {
  meetingId: string;
  description: string;
}

const updateMeetingDescription = async ({
  meetingId,
  description,
}: UpdateMeetingDescriptionParams) => {
  try {
    const response = await axiosInstance.put(`/api/v1/lightenings/${meetingId}`, {
      description,
    });

    return response.data;
  } catch (error) {
    console.error('Error updating meeting description:', error);
    throw new Error('설명을 업데이트하는 중 오류가 발생했습니다.');
  }
};

export default updateMeetingDescription;
