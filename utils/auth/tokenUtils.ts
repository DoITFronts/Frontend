import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  sub: number;
  email?: string;
  nickname?: string;
}

export const getToken = (): string | null => Cookies.get('accessToken') || null;

export const setToken = (token: string) => {
  Cookies.set('accessToken', token, { expires: 1 });
};

export const removeToken = () => {
  Cookies.remove('accessToken');
};

export const decodeToken = (token: string | null): DecodedToken | null => {
  if (!token) return null;
  try {
    const decoded: any = jwtDecode(token);
    return {
      sub: Number(decoded.sub),
      email: decoded.email || '',
    };
  } catch (error) {
    return null;
  }
};
