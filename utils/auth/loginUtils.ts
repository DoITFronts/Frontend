import { getToken } from './tokenUtils';

export const isUserLoggedIn = () => {
  return !!getToken();
};

export const getAuthHeaders = () => {
  const token = getToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = token.startsWith('Bearer') ? token : `Bearer ${token}`;
  }

  return headers;
};
