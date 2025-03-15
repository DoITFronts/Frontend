import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { removeToken } from '@/utils/auth/tokenUtils';
import { toast } from 'react-toastify';
import useUserStore from '@/store/user/userStore';
import { signoutUser } from '@/api/user/auth';
import { SIGNOUT_SUCCESS } from '@/constants/successText';
import { SIGNOUT_ERROR } from '@/constants/errorText';

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
      toast.success(SIGNOUT_SUCCESS);
      router.push('/');
    },
    onError: () => {
      toast.error(SIGNOUT_ERROR);
    },
  });
};
