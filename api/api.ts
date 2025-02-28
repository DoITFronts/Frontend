import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (token && !config.url?.includes('/api/v1/login')) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (error instanceof AxiosError) {
      console.error('Axios error:', error.message);

      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 400:
            console.error('Bad Request:', data);
            break;
          case 401:
            console.error('Unauthorized: Token expired or invalid');
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
            break;
          case 403:
            console.error('Forbidden: Access denied');
            break;
          case 404:
            console.error('Not Found:', data);
            break;
          case 500:
            console.error('Server Error:', data);
            break;
          default:
            console.error(`Unknown Error (${status}):`, data);
        }
      } else if (error.request) {
        console.error('No response received from server');
      } else {
        console.error('Request setup error:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
