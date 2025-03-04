import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token && !config.url?.includes('/api/v1/login')) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});

export default axiosInstance;
