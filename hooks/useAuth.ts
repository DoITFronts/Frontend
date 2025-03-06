// useSignin, useSignup, useSignout 훅 관리
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useState } from 'react';

import { signinUser, signupUser, signoutUser } from '@/api/user/auth';

// 로그인
export const useSignin = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: signinUser,
    onMutate: async (data) => {
      console.log('제출된 로그인 데이터:', data);
    },
    onSuccess: (response) => {
      console.log('로그인 응답:', response);
      const { accessToken } = response;
      if (accessToken) {
        // 로컬 스토리지,쿠키에 토큰 저장(쿠키 만료시간:1일 설정해둠)
        localStorage.setItem('accessToken', accessToken);
        Cookies.set('accessToken', accessToken, { expires: 1 });
        // 토큰 디코딩
        const decodedToken: any = jwtDecode(accessToken);
        console.log('디코딩된 유저 정보:', decodedToken);
        const userInfo = {
          email: decodedToken.email,
          exp: decodedToken.exp,
          iat: decodedToken.iat,
          nickname: decodedToken.nickname,
          sub: decodedToken.sub,
        };
        localStorage.setItem('email', userInfo.email);
        localStorage.setItem('nickname', userInfo.nickname);
        localStorage.setItem('sub', userInfo.sub);

        toast.success('성공적으로 로그인 되었습니다 :)', { hideProgressBar: true, autoClose: 900 });
        setErrorMessage(null);
        router.push('/meeting/list');
      }
    },
    onError: (error: any) => {
      console.error('로그인 실패:', error.response?.data || error.message);
      toast.error('로그인에 실패했습니다.');
      if (error.response?.status === 401) {
        setErrorMessage('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        setErrorMessage('로그인에 실패했습니다. 다시 시도해주세요!');
      }
    },
  });
  return { ...mutation, errorMessage };
};

// 회원가입
export const useSignup = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: signupUser,
    onMutate: async (data) => {
      console.log('제출된 회원가입 데이터:', data);
    },
    onSuccess: (response) => {
      console.log('회원가입 응답:', response);
      toast.success('회원가입이 완료되었습니다.', { hideProgressBar: true, autoClose: 900 });
      setErrorMessage(null);
      router.push('/user/signin');
    },
    onError: (error: any) => {
      console.error('회원가입 실패:', error);
      toast.error('회원가입에 실패했습니다.');
      if (error.response?.status === 400) {
        setErrorMessage('이미 가입되어있는 이메일입니다.');
      }
    },
  });
  return { ...mutation, errorMessage };
};

// 로그아웃
export const useSignout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signoutUser,
    onSuccess: () => {
      //로컬스토리지 초기화
      localStorage.clear();
      // localStorage.removeItem('accessToken');
      Cookies.remove('accessToken');

      toast.success('로그아웃 되었습니다.', { autoClose: 900 });
      router.push('/');
    },
    onError: () => {
      toast.error('로그아웃 실패', { autoClose: 900 });
    },
  });
};
