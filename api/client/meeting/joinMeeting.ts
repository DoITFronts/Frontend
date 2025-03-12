import axiosInstance from '@/api/client/api';

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

export { joinLightning, leaveLightning };
