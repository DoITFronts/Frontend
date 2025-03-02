import Icon from '@/components/shared/Icon';

export default function ButonBox() {
  return (
    <div className="w-auto h-auto flex gap-3">
      <button className="px-5 py-2.5 bg-black text-white text-base rounded-[12px] w-[100px] flex">
        번개 참여
      </button>
      <div className="w-auto h-[44px] p-2.5 bg-yellow-6 rounded-[12px]">
        <Icon path="chat" width="28px" height="24px" />
      </div>
    </div>
  );
}
