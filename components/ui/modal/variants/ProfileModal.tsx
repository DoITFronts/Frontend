import Icon from '@/components/shared/Icon';
import useModalStore from '@/store/useModalStore';
import { useState } from 'react';
import Button from '../../Button';

export default function ProfileModal() {
  const { closeModal } = useModalStore();
  const [nickname, setNickname] = useState('닉네임입니다.'); //TODO: 데이터 연동 시 기본값으로 해당 유저 닉네임으로 설정

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return (
    <div className="w-[343px] h-auto p-6 bg-white rounded-[24px] lg:w-[520px]">
      <div className="w-full h-auto flex flex-col gap-6">
        <div className="w-full h-7 flex justify-between">
          <span className="font-semibold text-black ">프로필 수정하기</span>
          <button onClick={closeModal}>
            <Icon path="X" width="24" height="24" />
          </button>
        </div>
        <form className="w-auto h-auto flex flex-col gap-6">
          <div className="flex flex-col">
            <label htmlFor="profileImg" className="w-fit cursor-pointer">
              {/* TODO: 기존 지정했던 이미지가 있을 시 해당 이미지, 없으면 기본 이미지 렌더링 */}
              <Icon path="profile/editAvatar" width="56px" height="56px" />
            </label>
            <input type="file" id="profileImg" className="hidden" />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="nickname" className="text-black font-semibold">
              닉네임
            </label>
            <input
              type="text"
              value={nickname} // TODO: 데이터 연동시 기존 계정 닉네임값 넣을 예정입니다.
              onChange={handleNickname}
              className="bg-gray-50 text-gray-800 rounded-lg w-full px-4 py-2.5"
            />
          </div>
        </form>
        <div className="w-auto h-auto justify-between flex gap-4">
          <Button color="white" type="button" size="sm" className="w-full">
            취소
          </Button>
          {/* TODO: 데이터값 변경시 버튼 활성화 */}
          <Button color="filled" type="button" className="w-full" disabled={true}>
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
}
