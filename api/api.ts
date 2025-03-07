import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const requestTimes = new Map<string, number>();

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');

    if (token && !config.url?.includes('/api/v1/login')) {
      config.headers.Authorization = token.startsWith('Bearer') ? token : `Bearer ${token}`;
    }

    if (config.url) {
      requestTimes.set(config.url, Date.now());
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => {
    const { url } = response.config;
    if (url) {
      const startTime = requestTimes.get(url);
      if (startTime) {
        console.log(`[${url}] 응답 시간: ${Date.now() - startTime}ms`);
        requestTimes.delete(url);
      }
    }
    return response;
  },
  async (error: AxiosError) => {
    if (!error.response) {
      console.error('No response from server');
      return Promise.reject(error);
    }

    const { status, config } = error.response;

    switch (status) {
      case 401:
        localStorage.removeItem('accessToken');
        // window.location.href = '/login';
        break;

      case 403:
        alert('접근 권한이 없습니다.');
        break;

      case 429:
        await new Promise((resolve) => {
          setTimeout(resolve, 3000);
        });
        return axiosInstance(config);

      case 500:
        alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        break;

      default:
        console.error(`Error (${status}):`, error.response.data);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
