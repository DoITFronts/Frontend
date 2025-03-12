import Icon from '@/components/shared/Icon';

function Title({ name, location }: { name: string; location: string }) {
  return (
    <div className="flex flex-row items-center gap-1.5 font-['Pretendard'] text-2xl font-semibold text-black">
      <div className="max-w-[350px] truncate text-2xl font-bold text-black">{name}</div>

      <div className="flex min-w-[130px] items-center justify-start">
        <Icon path="/card/location-marker" />
        <div className="font-['Pretendard'] text-base font-semibold leading-snug text-[#595959]">
          {location}
        </div>
      </div>
    </div>
  );
}

export default Title;
