import Icon from '@/components/shared/Icon';
import Button from '../../Button';

export default function SignUpModal() {
  return (
    <div className="w-[300px] h-auto p-6 bg-white rounded-[8px]">
      <div className="w-auto h-auto flex flex-col gap-10">
        <div className="w-full flex flex-col gap-6 ">
          <div className="w-full flex justify-end">
            {/* TODO: 추후에 X클릭 시 모달이 닫히며 "/"페이지로 이동? */}
            <Icon path="X" width="15px" height="15px" />
          </div>
          <span className="font-medium text-black text-center">가입이 완료되었습니다!</span>
        </div>
        <div className="w-full h-auto flex justify-center">
          {/* TODO: 추후에 확인 버튼 클릭 시 모임 찾기 페이지로 이동? */}
          <Button color="filled">확인</Button>
        </div>
      </div>
    </div>
  );
}
