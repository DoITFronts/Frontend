import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useUserStore from '@/store/user/userStore';
import { signinUser } from '@/api/client/user/auth';
import { setToken, decodeToken } from '@/utils/auth/tokenUtils';
import { fetchProfile } from '@/api/client/myPage/myPage';

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

          toast.success('성공적으로 로그인 되었습니다 :)', {
            hideProgressBar: true,
            autoClose: 900,
          });
          router.push('/meeting/list');
          fetchProfile();
        }
      }
    },
    onError: (error: any) => {
      console.error('로그인 실패:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        toast.error('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        toast.error('로그인에 실패했습니다. 다시 시도해주세요!');
      }
    },
  });
};
