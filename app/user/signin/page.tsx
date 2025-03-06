'use client';

import Form from '@/components/form/Form';
import Logo from '@/public/assets/logo.svg';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Icon from '@/components/shared/Icon';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { useSignin } from '@/hooks/useAuth';

export default function Signin() {
  const { mutate, errorMessage } = useSignin();
  const { setValue } = useForm();

  const handleSignin = (data: SignInRequestData) => {
    mutate(data);
  };

  //테스트 계정 버튼 handler
  const handleTestAccountClick = () => {
    // 테스트 계정 자동 입력 처리
    setValue('username', 'guest@gmail.com');
    setValue('password', 'asdf1234!!');

    // 자동 로그인
    handleSignin({ username: 'guest@gmail.com', password: 'asdf1234!!' });
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <div className="w-[402px]">
        <div className="flex justify-center items-center mb-[50px]">
          <Link href="/">
            <Image src={Logo} alt="번개팅 로고" width={147.6} height={32.4} />
          </Link>
        </div>
        <Form onSubmit={handleSignin}>
          <Form.Label className="pb-6">
            <Form.LabelHeader className="pb-2">이메일</Form.LabelHeader>
            <Form.Input
              name="username"
              placeholder="이메일을 입력해 주세요"
              autoComplete="email"
              required
            />
          </Form.Label>
          <Form.Label className="pb-10">
            <Form.LabelHeader className="pb-2">비밀번호</Form.LabelHeader>
            <Form.PasswordInput
              name="password"
              placeholder="비밀번호를 입력해 주세요"
              autoComplete="password"
              required
            />
            {errorMessage && (
              <Form.ErrorMessage className="pt-3 pl-2">{errorMessage}</Form.ErrorMessage>
            )}
          </Form.Label>
          <Form.Submit className="w-full">로그인</Form.Submit>
          <Button
            className="py-[10px] px-3 bg-gradient-to-r from-black to-cyan-800  hover:bg-red-7 w-full mt-[18px] text-white text-base font-bold text-center"
            onClick={handleTestAccountClick}
          >
            ⚡️ 게스트 로그인 ⚡️
          </Button>
          <Button className="py-[10px] px-3 bg-[#fee500] hover:bg-[#fee500] active:bg-[#fee500] w-full mt-[18px] text-black text-base font-bold text-center">
            <Icon path="user/kakaoLogo" width="22px" height="22px" />
            카카오로 로그인하기
          </Button>
        </Form>
        <div className="flex justify-center items-center gap-2 font-['Pretendard'] text-[15px] text-neutral-800 font-bold mt-3">
          처음이신가요?
          <Link className="text-gray-300 underline" href="/user/signup">
            회원가입 하기
          </Link>
        </div>
      </div>
    </div>
  );
}
