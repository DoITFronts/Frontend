"use client";

import Image from "next/image";
import Link from "next/link";

import Form from "@/app/user/component/Form";
import { useSignup } from "@/hooks/user/useSignUp";
import Logo from "@/public/assets/logo/logo.svg";

import ConfettiEffect from "../component/ConfettiEffect";

export default function Signup() {
  const { mutate, error, showConfetti } = useSignup();

  const handleSignup = (data: SignUpRequestData) => {
    mutate(data);
  };

  // 에러 메세지
  const errorMessage =
    error?.response?.status === 400
      ? "이미 가입되어있는 이메일입니다.."
      : "회원가입에 실패했습니다. 다시 시도해주세요!";

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <ConfettiEffect isActive={showConfetti} />
      <div className="flex w-[20.625rem] flex-col items-center sm:w-[25.125rem]">
        <div className="w-[95%]">
          <div className="mb-[1.875rem] flex items-center justify-center sm:mb-[3.125rem]">
            <Link href="/">
              <Image
                src={Logo}
                alt="번개팅 로고"
                className="h-[1.375rem] w-[6.25rem] sm:h-[2.025rem] sm:w-[9.1875rem]"
              />
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
              {error && (
                <Form.ErrorMessage className="mt-1 pl-2">
                  {errorMessage}
                </Form.ErrorMessage>
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
              <Form.LabelHeader className="pb-2">
                비밀번호 확인
              </Form.LabelHeader>
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
            <Form.Submit className="h-10 w-full text-sm sm:h-11 sm:text-base">
              회원가입
            </Form.Submit>
          </Form>
          <div className="mt-3 flex items-center justify-center gap-2 font-['Pretendard'] text-xs font-bold text-neutral-800 sm:text-base">
            이미 회원이신가요?{" "}
            <Link className="text-gray-300 underline" href="/user/signin">
              로그인하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
