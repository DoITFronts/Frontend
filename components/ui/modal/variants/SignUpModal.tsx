import Button from '@/components/ui/button/Button';
import Icon from '@/components/utils/Icon';


export default function SignUpModal() {
  return (
    <div className="h-auto w-[300px] rounded-[8px] bg-white p-6">
      <div className="flex size-auto flex-col gap-10">
        <div className="flex w-full flex-col gap-6 ">
          <div className="flex w-full justify-end">
            {/* TODO: 추후에 X클릭 시 모달이 닫히며 "/"페이지로 이동? */}
            <Icon path="X" width="15px" height="15px" />
          </div>
          <span className="text-center font-medium text-black">가입이 완료되었습니다!</span>
        </div>
        <div className="flex h-auto w-full justify-center">
          {/* TODO: 추후에 확인 버튼 클릭 시 모임 찾기 페이지로 이동? */}
          <Button color="filled">확인</Button>
        </div>
      </div>
    </div>
  );
}
