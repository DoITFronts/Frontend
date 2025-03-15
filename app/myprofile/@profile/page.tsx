"use client";

import { useEffect, useState } from "react";

import { fetchProfile } from "@/api/myPage/myPage";
import EditingIcon from "@/app/meeting/detail/components/EditingIcon";
import ProfileIcon from "@/components/utils/BaseProfile";
import useModalStore from "@/store/useModalStore";
import useProfileStore from "@/store/useProfileStore";

export default function Page() {
  const [iconStatus, setIconStatus] = useState<"default" | "hover" | "editing">(
    "default",
  );
  const { nickname, email, description, imageUrl } = useProfileStore();
  const { openModal } = useModalStore();

  return (
    <div className="relative flex h-auto w-full gap-2.5 justify-self-start lg:flex lg:items-center lg:gap-6">
      <div
        className="absolute right-0 top-0 cursor-pointer"
        onMouseEnter={() => setIconStatus("hover")}
        onMouseLeave={() => setIconStatus("default")}
        onClick={() => openModal("editProfile")}
      >
        <EditingIcon status={iconStatus} />
      </div>
      {imageUrl ? (
        <div className="flex size-10 overflow-hidden rounded-full sm:align-top lg:size-[102px]">
          <img
            src={`${imageUrl}?timestamp=${new Date().getTime()}`}
            alt="프로필 이미지"
            className="size-full object-cover"
          />
        </div>
      ) : (
        <ProfileIcon size={102} />
      )}

      <div className="flex size-auto flex-col gap-[2px]">
        <div className="flex size-auto flex-col justify-start gap-[2px] md:flex-row md:gap-2.5 lg:flex-row lg:gap-2.5">
          <span className="font-pretandard text-lg font-bold text-black md:text-2xl lg:text-2xl">
            {nickname}
          </span>
          <span className="font-pretandard text-sm font-medium text-black-6 md:text-lg lg:text-lg">
            {email}
          </span>
        </div>
        <div className="size-auto font-pretandard text-sm text-black-10 md:text-xl lg:text-xl">
          {description}
        </div>
      </div>
    </div>
  );
}
