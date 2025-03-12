import Button from '@/components/ui/button/Button';
import useModalStore from '@/store/useModalStore';

export default function Header() {
  const { openModal } = useModalStore();

  return (
    <div className="mb-[52px] flex items-center justify-between">
      <div className="inline-flex h-[68px] flex-col items-start justify-start gap-[9px]">
        <div className="text-center font-dunggeunmo text-3xl font-normal text-black">
          맛집 탐방 같이 갈 사람, 누구 없나요?
        </div>
        <div className="text-center font-pretandard text-2xl font-normal text-black">
          맛집 탐방 같이 갈 사람, 누구 없나요?
        </div>
      </div>
      <Button color="white" size="sm" type="submit" onClick={() => openModal('create')}>
        번개 만들기
      </Button>
    </div>
  );
}
