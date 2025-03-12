'use client';

import Image from 'next/image';
import Link from 'next/link';

import Form from '@/components/form/Form';
import { useSignup } from '@/hooks/useAuth';
import Logo from '@/public/assets/logo.svg';

export default function Signup() {
  const { mutate, errorMessage } = useSignup();

  const handleSignup = (data: SignUpRequestData) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white py-[5%]">
      <div className="w-[402px]">
        <div className="mb-[50px] flex items-center justify-center">
          <Link href="/">
            <Image src={Logo} alt="번개팅 로고" width={148} height={33} />
          </Link>
        </div>
        <Form onSubmit={handleSignup}>
          <Form.Label className="pb-6">
            <Form.LabelHeader className="pb-2">이름</Form.LabelHeader>
            <Form.Input
              name="name"
              placeholder="이름을 입력해 주세요"
              autoComplete="name"
              required
            />
          </Form.Label>
          <Form.Label className="pb-6">
            <Form.LabelHeader className="pb-2">이메일</Form.LabelHeader>
            <Form.Input
              name="email"
              placeholder="이메일을 입력해 주세요"
              autoComplete="email"
              required
            />
            {errorMessage && (
              <Form.ErrorMessage className="mt-1 pl-2">{errorMessage}</Form.ErrorMessage>
            )}
          </Form.Label>
          <Form.Label className="pb-6">
            <Form.LabelHeader className="pb-2">닉네임</Form.LabelHeader>
            <Form.Input
              name="nickname"
              placeholder="닉네임을 입력해 주세요"
              autoComplete="nickname"
              required
            />
          </Form.Label>
          <Form.Label className="pb-6">
            <Form.LabelHeader className="pb-2">비밀번호</Form.LabelHeader>
            <Form.PasswordInput
              name="password"
              placeholder="비밀번호를 입력해 주세요"
              autoComplete="password"
              required
            />
          </Form.Label>
          <Form.Label className="pb-6">
            <Form.LabelHeader className="pb-2">비밀번호 확인</Form.LabelHeader>
            <Form.PasswordInput
              name="passwordConfirmation"
              placeholder="비밀번호를 다시 한번 입력해 주세요"
              autoComplete="password"
              required
            />
          </Form.Label>
          <Form.Label className="pb-10">
            <Form.LabelHeader className="pb-2">생년월일</Form.LabelHeader>
            <Form.Input
              name="birth"
              placeholder="YYYY.MM.DD 생년월일을 입력해 주세요"
              required
              type="date"
            />
          </Form.Label>
          <Form.Submit className="w-full">회원가입</Form.Submit>
        </Form>
        <div className="mt-3 flex items-center justify-center gap-2 font-['Pretendard'] text-[15px] font-bold text-neutral-800">
          이미 회원이신가요?{' '}
          <Link className="text-gray-300 underline" href="/user/signin">
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}
