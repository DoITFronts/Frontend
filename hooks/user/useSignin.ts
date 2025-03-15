import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useUserStore from '@/store/user/userStore';
import { signinUser } from '@/api/user/auth';
import { setToken, decodeToken } from '@/utils/auth/tokenUtils';
import { fetchProfile } from '@/api/myPage/myPage';
import { SIGNIN_SUCCESS } from '@/constants/successText';
import { SIGNIN_ERROR, INVALID_CREDENTIALS_ERROR } from '@/constants/errorText';

export const useSignin = () => {
  const router = useRouter();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: signinUser,
    onSuccess: (response) => {
      const { accessToken } = response;
      if (accessToken) {
        setToken(accessToken);
        const decodedToken = decodeToken(accessToken);
        if (decodedToken) {
          setUser({
            sub: decodedToken.sub,
            email: decodedToken.email || '',
            nickname: decodedToken.nickname || '',
          });

          toast.success(SIGNIN_SUCCESS);
          router.push('/meeting/list');
          fetchProfile();
        }
      }
    },
    onError: (error: any) => {
      console.error('로그인 실패:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        toast.error(INVALID_CREDENTIALS_ERROR);
      } else {
        toast.error(SIGNIN_ERROR);
      }
    },
  });
};
