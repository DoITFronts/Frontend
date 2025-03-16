import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { removeToken } from '@/utils/auth/tokenUtils';
import { toast } from 'react-toastify';
import useUserStore from '@/store/user/userStore';
import { signoutUser } from '@/api/client/user/auth';
import { SIGNOUT_SUCCESS, SIGNOUT_ERROR } from '@/lib/constants/toast';

// 로그아웃
export const useSignout = () => {
  const router = useRouter();
  const { logout } = useUserStore();

  return useMutation({
    mutationFn: async () => {
      try {
        await signoutUser();
      } catch (error) {
        toast.error(SIGNOUT_ERROR);
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
