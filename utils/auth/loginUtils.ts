// isUserLoggedIn() (로컬 스토리지에서 로그인 여부 확인

export const isUserLoggedIn = () => {
  const token = localStorage.getItem('accessToken');
  return !!token;
};

export const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `${token}`;
  }

  return headers;
};
