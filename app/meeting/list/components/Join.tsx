import Image from 'next/image';

function Join() {
  return (
    <div className="inline-flex h-6 items-center justify-start gap-2">
      <div className="font-['Pretendard'] text-base font-semibold leading-normal text-orange-600">
        join now
      </div>
      <Image src="" width={18} height={18} alt="right_arrow" />
    </div>
  );
}

export default Join;
