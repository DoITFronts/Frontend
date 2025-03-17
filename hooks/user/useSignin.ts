import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { fetchProfile } from "@/api/client/myPage/myPage";
import { signinUser } from "@/api/client/user/auth";
import {
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  INVALID_CREDENTIALS_ERROR,
} from "@/lib/constants/toast";
import useUserStore from "@/store/user/userStore";
import { setToken, decodeToken } from "@/utils/auth/tokenUtils";

export const useSignin = () => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const [showConfetti, setShowConfetti] = useState(false); // 컨패티 상태관리

  const mutation = useMutation({
    mutationFn: signinUser,
    onSuccess: (response) => {
      const { accessToken } = response;
      if (accessToken) {
        setToken(accessToken);
        const decodedToken = decodeToken(accessToken);
        if (decodedToken) {
          setUser({
            sub: decodedToken.sub,
            email: decodedToken.email || "",
            nickname: decodedToken.nickname || "",
          });

          toast.success(SIGNIN_SUCCESS);

          // 컨페티 실행
          setShowConfetti(true);
          setTimeout(() => {
            router.push("/meeting/list");
          }, 2500);

          fetchProfile();
        }
      }
    },
    onError: (error: any) => {
      console.error("로그인 실패:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        toast.error(INVALID_CREDENTIALS_ERROR);
      } else {
        toast.error(SIGNIN_ERROR);
      }
    },
  });

  return { ...mutation, showConfetti };
};
