import Image from 'next/image';

export default function FallbackImage() {
  return (
    <Image
      src="/fallback/fallback_image_cafe.png"
      alt="fallback img"
      className="size-full bg-indigo-500 object-contain"
      width="518"
      height="270"
      priority
    />
  );
}
