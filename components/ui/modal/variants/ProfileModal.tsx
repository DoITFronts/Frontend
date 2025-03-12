import Icon from '@/components/utils/Icon';
import useModalStore from '@/store/useModalStore';
import { ChangeEvent, useEffect, useState } from 'react';
import Button from '@/components/ui/button/Button';
import Image from 'next/image';
import userProfile from '@/public/userProfile.svg';
import useUserStore from '@/store/userStore';
import useProfileStore from '@/store/useProfileStore';
import { fetchProfile, updateProfile } from '@/api/client/myPage/myPage';
import { toast } from 'react-toastify';

const MAX_NICKNAME_LENGTH = 8;
const MAX_DESCRIPTION_LENGTH = 50;

export default function ProfileModal() {
  const { closeModal } = useModalStore();

  const { nickname: storeNickname, description: storeDescription, imageUrl } = useProfileStore();

  const [nickname, setNickname] = useState(storeNickname); //TODO: 데이터 연동 시 기본값으로 해당 유저 닉네임으로 설정
  const [description, setDescription] = useState(storeDescription || '');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (storeNickname) setNickname(storeNickname);
    if (storeDescription) setDescription(storeDescription);
  }, [storeNickname, storeDescription, selectedImage]);

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_NICKNAME_LENGTH) {
      setNickname(e.target.value);
    }
  };

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(e.target.value);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await updateProfile(
        {
          nickname,
          description,
        },
        selectedImage,
      );
      toast.success('프로필이 성공적으로 수정되었습니다.', { autoClose: 900 });
      closeModal();
    } catch (error) {
      toast.error('프로필 수정에 실패했습니다.', { autoClose: 900 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[343px] h-auto p-6 bg-white rounded-[24px] lg:w-[520px]">
      <div className="w-full h-auto flex flex-col gap-6">
        <div className="w-full h-auto gap-4 flex flex-col">
          <div className="w-full h-auto flex justify-between">
            <span className="font-dunggeunmo text-xl">프로필 수정하기</span>
            <button onClick={closeModal}>
              <Icon path="X" width="24" height="24" />
            </button>
          </div>
          <div className="w-full h-auto flex gap-4 items-center">
            <div>
              <label htmlFor="profileImg" className="w-fit cursor-pointer">
                {selectedImage ? (
                  <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="프로필 이미지 미리보기"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : imageUrl ? (
                  <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                    <img
                      src={`${imageUrl}?timestamp=${new Date().getTime()}`}
                      alt="프로필 이미지"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <Image src={userProfile} width={70} height={70} alt="프로필 이미지" />
                )}
              </label>
              <input
                type="file"
                id="profileImg"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="w-full h-auto flex flex-col gap-1">
              <div className="w-full h-auto flex justify-between">
                <span className="font-bold tex-base">{storeNickname}</span>
                <div>
                  <span className="text-black-4 text-sm font-medium">{nickname.length}/</span>
                  <span className="text-black-6 text-sm font-medium">8</span>
                </div>
              </div>
              <input
                className="w-full h-auto px-4 py-2.5 rounded-[12px] bg-black-2 placeholder:font-medium placeholder:text-black-6"
                placeholder="닉네임을 작성해 주세요."
                onChange={handleNickname}
                value={nickname}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex flex-col gap-1 ">
          <div className="flex justify-between w-full h-auto ">
            <label htmlFor="summary" className="font-bold text-base">
              자기소개
            </label>
            <div>
              <span className="font-medium text-sm text-black-4">{description.length}/</span>
              <span className="font-medium text-sm text-black-6">50</span>
            </div>
          </div>
          <input
            className="w-full h-auto px-4 py-2.5 bg-black-2 rounded-[12px] placeholder:text-black-6 placeholder:font-medium"
            placeholder="자기소개를 입력해 주세요."
            onChange={handleDescription}
            value={description}
          />
        </div>
        <div className="w-full h-auto justify-between gap-2.5 flex">
          <Button color="white" type="button" size="sm" className="w-full">
            취소
          </Button>
          <Button color="filled" type="button" className="w-full" onClick={handleSubmit}>
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
}
