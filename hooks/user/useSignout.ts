import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { removeToken } from '@/utils/auth/tokenUtils';
import { toast } from 'react-toastify';
import useUserStore from '@/store/user/userStore';
import { signoutUser } from '@/api/client/user/auth';

// 로그아웃
export const useSignout = () => {
  const router = useRouter();
  const { logout } = useUserStore();

  return useMutation({
    mutationFn: async () => {
      try {
        await signoutUser();
      } catch (error) {
        toast.error('로그아웃에 실패하였습니다.');
      }
    },
    onSuccess: () => {
      removeToken();
      logout();
      toast.success('로그아웃 되었습니다.', { hideProgressBar: true, autoClose: 900 });
      router.push('/');
    },
    onError: () => {
      toast.error('로그아웃 실패', { hideProgressBar: true, autoClose: 900 });
    },
  });
};
