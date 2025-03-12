import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useThemeStore } from '@/store/themeStore';
import userStore from '@/store/userStore';

const fetchUserInfo = async () => {
  const storedUserInfo = localStorage.getItem('userInfo');
  return storedUserInfo ? JSON.parse(storedUserInfo) : null;
};

const useUserInfo = () =>
  useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    staleTime: Infinity,
    gcTime: Infinity,
  });

const useSetUser = () => {
  const { data: userInfo } = useUserInfo();
  const setUser = userStore((state) => state.setUser);

  useEffect(() => {
    if (userInfo?.sub) {
      setUser(userInfo);
    }
  }, [userInfo, setUser]);
};

const useSetUserTheme = () => {
  const { data: userInfo } = useUserInfo();
  const setUserTheme = useThemeStore((state) => state.setUserTheme);

  useEffect(() => {
    if (userInfo?.sub) {
      setUserTheme(userInfo.sub);
    }
  }, [userInfo, setUserTheme]);
};

export { useUserInfo, useSetUser, useSetUserTheme };
