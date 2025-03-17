import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { signupUser } from "@/api/client/user/auth";
import { SIGNUP_SUCCESS, SIGNUP_ERROR } from "@/lib/constants/toast";

export const useSignup = () => {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false); // 컨패티 상태관리

  const mutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success(SIGNUP_SUCCESS);

      setShowConfetti(true);
      setTimeout(() => {
        router.push("/user/signin");
      }, 2500);
    },
    onError: (error: any) => {
      console.error("회원가입 실패:", error);
      toast.error(SIGNUP_ERROR);
    },
  });

  return { ...mutation, showConfetti };
};
