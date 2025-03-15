import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signupUser } from '@/api/client/user/auth';

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다.', { hideProgressBar: true, autoClose: 900 });
      router.push('/user/signin');
    },
    onError: (error: any) => {
      console.error('회원가입 실패:', error);
      toast.error('이미 가입되어있는 이메일입니다.', { hideProgressBar: true, autoClose: 900 });
    },
  });
};
