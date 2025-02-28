import React from "react";
import Image from "next/image";
import ProfileIcon from "@/components/shared/BaseProfile";

interface HostProfileProps {
    host?: {
        id: string;
        name: string;
        profileImage?: string;
        email: string;
        userBio: string;
    };
}

const HostProfile: React.FC<HostProfileProps> = ({ host }) => {
    const defaultHost = {
        id: "0",
        name: "알 수 없는 사용자",
        profileImage: "",
        email: "unknown@example.com",
        userBio: "사용자 정보가 없습니다.",
    };

    const activeHost = host ?? defaultHost;

    return (
        <div className="h-full w-full mb-7 flex-col justify-start items-start gap-6 inline-flex">
            <div className="self-stretch text-black text-2xl font-normal font-['DungGeunMo']">
                번개 주최자 정보
            </div>
            <div className="self-stretch justify-start items-start gap-3.5 inline-flex">
                {/* 프로필 이미지 또는 기본 아이콘 */}
                <div className="relative w-[42px] h-[42px] rounded-full overflow-hidden">
                    {activeHost.profileImage ? (
                        <Image
                            src={activeHost.profileImage}
                            alt={`${activeHost.name} 프로필`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                        />
                    ) : (
                        <ProfileIcon theme="light" size={42} />
                    )}
                </div>

                {/* 호스트 정보 */}
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-0.5 inline-flex">
                    <div className="justify-start items-center gap-2 inline-flex">
                        <div className="text-black text-xl font-bold font-['Pretendard']">
                            {activeHost.name}
                        </div>
                        <div className="text-[#bfbfbf] text-base font-medium font-['Pretendard']">
                            {activeHost.email}
                        </div>
                    </div>
                    <div className="text-neutral-800 text-base font-medium font-['Pretendard'] leading-normal">
                        {activeHost.userBio}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HostProfile;