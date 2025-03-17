"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

import Form from "@/app/user/component/Form";
import Button from "@/components/ui/button/Button";
import { useSignin } from "@/hooks/user/useSignin";
import Logo from "@/public/assets/logo/logo.svg";

import ConfettiEffect from "../component/ConfettiEffect";

export default function Signin() {
  const { mutate, error, showConfetti } = useSignin();
  const { setValue } = useForm();

  const handleSignin = (data: SignInRequestData) => {
    mutate(data);
  };

  // 테스트 계정 버튼 handler
  const handleTestAccountClick = () => {
    // 테스트 계정 자동 입력 처리
    setValue("username", "guest@gmail.com");
    setValue("password", "asdf1234!!");

    // 자동 로그인
    handleSignin({ username: "guest@gmail.com", password: "asdf1234!!" });
  };

  // 에러 메세지
  const errorMessage =
    error?.response?.status === 401
      ? "이메일 또는 비밀번호가 올바르지 않습니다."
      : "로그인에 실패했습니다. 다시 시도해주세요!";

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
              {error && (
                <Form.ErrorMessage className="pl-2 pt-3">
                  {errorMessage}
                </Form.ErrorMessage>
              )}
            </Form.Label>
            <Form.Submit className="h-10 w-full text-sm sm:h-11 sm:text-base">
              로그인
            </Form.Submit>
            <Button
              className="mt-[1.125rem] h-10 w-full bg-gradient-to-r from-black to-cyan-800 px-3 py-2.5 text-center text-sm font-bold text-white sm:h-11 sm:text-base"
              onClick={handleTestAccountClick}
            >
              ⚡️ 게스트 로그인 ⚡️
            </Button>
            {/* <Button className="mt-[1.125rem] w-full bg-[#fee500] px-3 py-[0.625rem] text-center text-sm sm:text-base font-bold text-black hover:bg-[#fee500] active:bg-[#fee500] sm:h-[2.75rem] h-[2.5rem]">
              <Icon path="user/kakaoLogo" width="22px" height="22px" />
              카카오로 로그인하기
            </Button> */}
          </Form>
          <div className="mt-3 flex items-center justify-center gap-2 font-['Pretendard'] text-xs font-bold text-neutral-800 sm:text-base">
            처음이신가요?
            <Link className="text-gray-300 underline" href="/user/signup">
              회원가입 하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
