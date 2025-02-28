import Image from 'next/image';

interface HostInfoProps {
  id: string;
  name: string;
  profileImage?: string;
}

function HostInfo({ id, name, profileImage }: HostInfoProps) {
  const imageSrc = profileImage || '/assets/profile/userProfileDarkDefault.svg';

  return (
    <div className="flex h-6 items-center gap-[6px]">
      <Image src={imageSrc} width={24} height={24} alt="profile" className="size-6 rounded-full" />
      <p className="font-pretandard text-base font-bold text-[#bfbfbf]">{name}</p>
    </div>
  );
}

export default HostInfo;
