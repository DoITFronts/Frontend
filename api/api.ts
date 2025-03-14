import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '@/utils/auth/tokenUtils';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const requestTimes = new Map<string, number>();

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();

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
    // error Toast 띄우기
    toast.error((error.response?.data as { message?: string })?.message || '오류가 발생했습니다', {
      hideProgressBar: true,
      autoClose: 900,
      position: 'top-center',
      theme: 'colored',
    });
    toast.clearWaitingQueue(); // toast 여러번 눌렀을때, 뒤에 대기중인 toast 지우기 (1번만 실행되게)

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
