import axiosInstance from '@/api/middleware/api';

const joinLightning = async (id: string) => {
  try {
    const response = await axiosInstance.post(`/api/v1/lightenings/${Number(id)}/join`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const leaveLightning = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/lightenings/${Number(id)}/join`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const deleteLightning = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/lightenings/${Number(id)}`);
    console.log('Delete successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to delete lightning:', error);
    return Promise.reject(error);
  }
};

export { joinLightning, leaveLightning, deleteLightning };
