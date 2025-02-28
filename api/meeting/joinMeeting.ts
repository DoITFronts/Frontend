import axiosInstance from '@/api/api';

const joinLightning = async () => {
  try {
    const response = await axiosInstance.post(`/api/v1/lightenings/2/join`);
    console.log('Joined successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to join lightning:', error);
    return Promise.reject(error);
  }
};

const leaveLightning = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/lightenings/${Number(id)}/join`);
    console.log('Left successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to leave lightning:', error);
    return Promise.reject(error);
  }
};

export { joinLightning, leaveLightning };
