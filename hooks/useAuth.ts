import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { signinUser, signupUser, signoutUser } from '@/api/user/auth';

//로그인
export const useSignin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signinUser,
    onMutate: async (data) => {
      console.log('제출된 로그인 데이터:', data);
    },
    onSuccess: (response) => {
      console.log('로그인 응답:', response);
      const accessToken = response.accessToken;
      if (accessToken) {
        //로컬 스토리지,쿠키에 토큰 저장(쿠키 만료시간:1일 설정해둠)
        localStorage.setItem('accessToken', accessToken);
        Cookies.set('accessToken', accessToken, { expires: 1 });
        // 토큰 디코딩 test
        const decodedToken: any = jwtDecode(accessToken);
        console.log('디코딩된 유저 정보:', decodedToken);

        toast.success('성공적으로 로그인 되었습니다 :)', { hideProgressBar: true, autoClose: 900 });
        router.push('/');
      }
    },
    onError: (error: any) => {
      console.error('로그인 실패:', error.response?.data || error.message);
      toast.error('로그인에 실패했습니다.');
    },
  });
};

//회원가입
export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signupUser,
    onMutate: async (data) => {
      console.log('제출된 회원가입 데이터:', data);
    },
    onSuccess: (response) => {
      console.log('회원가입 응답:', response);
      toast.success('회원가입이 완료되었습니다.', { hideProgressBar: true, autoClose: 900 });
      router.push('/user/signin');
    },
    onError: (err: any) => {
      console.error('회원가입 실패:', err);
      toast.error('회원가입에 실패했습니다.');
    },
  });
};

//로그아웃
export const useSignout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signoutUser,
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      Cookies.remove('accessToken');

      toast.success('로그아웃 되었습니다.', { autoClose: 900 });
      router.push('/');
    },
    onError: () => {
      toast.error('로그아웃 실패', { autoClose: 900 });
    },
  });
};
