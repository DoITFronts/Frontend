'use client';

import Image from 'next/image';
import Link from 'next/link';

import Form from '@/components/form/Form';
import Logo from '@/public/assets/logo.svg';

export default function Signup() {
  return (
    <div className="flex items-center justify-center bg-white py-52">
      <div className="w-[402px]">
        <div className="mb-[50px] flex items-center justify-center">
          <Image src={Logo} alt="번개팅 로고" width={147.6} height={32.4} />
        </div>
        <Form onSubmit={() => console.log('제출된 데이터')}>
          <Form.Label className="pb-3">
            <Form.LabelHeader className="pb-2">이름</Form.LabelHeader>
            <Form.Input
              name="name"
              placeholder="이름을 입력해 주세요"
              autoComplete="name"
              required
            />
          </Form.Label>
          <Form.Label className="pb-3">
            <Form.LabelHeader className="pb-2">이메일</Form.LabelHeader>
            <Form.Input
              name="email"
              placeholder="이메일을 입력해 주세요"
              autoComplete="email"
              required
            />
          </Form.Label>
          <Form.Label className="pb-3">
            <Form.LabelHeader className="pb-2">닉네임</Form.LabelHeader>
            <Form.Input
              name="nickname"
              placeholder="닉네임을 입력해 주세요"
              autoComplete="nickname"
              required
            />
          </Form.Label>
          <Form.Label className="pb-3">
            <Form.LabelHeader className="pb-2">비밀번호</Form.LabelHeader>
            <Form.PasswordInput
              name="password"
              placeholder="비밀번호를 입력해 주세요"
              autoComplete="password"
              required
            />
          </Form.Label>
          <Form.Label className="pb-3">
            <Form.LabelHeader className="pb-2">비밀번호 확인</Form.LabelHeader>
            <Form.PasswordInput
              name="passwordConfirmation"
              placeholder="비밀번호를 다시 한번 입력해 주세요"
              autoComplete="password"
              required
            />
          </Form.Label>
          <Form.Label className="pb-10">
            <Form.LabelHeader className="pb-2">본인인증</Form.LabelHeader>
            <Form.Input
              name="birthVerify"
              placeholder="YYYY.MM.DD 생년월일을 입력해 주세요"
              required
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
