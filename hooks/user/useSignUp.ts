import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signupUser } from '@/api/client/user/auth';
import { SIGNUP_SUCCESS, SIGNUP_ERROR } from '@/lib/constants/toast';

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success(SIGNUP_SUCCESS);
      router.push('/user/signin');
    },
    onError: (error: any) => {
      console.error('회원가입 실패:', error);
      toast.error(SIGNUP_ERROR);
    },
  });
};
