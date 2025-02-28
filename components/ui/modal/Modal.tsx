'use client';
import React, { useEffect } from 'react';
import useModalStore from '@/store/useModalStore';
import CreateMeetingModal from './variants/CreateMeetingModal';
import ProfileModal from './variants/ProfileModal';
import SignUpModal from './variants/SignUpModal';

/**
 * 전역 모달 상태를 관리하는 모달 컴포넌트입니다.
 *
 * useModalStore의 상태에 따라 다양한 유형의 모달을 렌더링합니다.
 *
 * 모달 외부 영역 클릭 시 자동으로 닫힙니다.
 *
 * @component
 * @example
 * //모달 사용 예시
 * import useModalStore from '@/store/useModalStore';
 *
 * function SomeComponent() {
 *   const { openModal } = useModalStore();
 *
 *   const handleClick = () => {
 *     openModal('create'); // 미팅 생성 모달 열기
 *   };
 *
 *   return <button onClick={handleClick}>미팅 만들기</button>;
 * }
 *
 * @property {Object} modalTypes - 지원하는 모달 타입들
 * @property {'create'} modalTypes.create - 미팅 생성 모달
 * @property {'calender'} modalTypes.calender - 캘린더 모달
 * @property {'signUp'} modalTypes.signUp - 회원가입 성공 모달
 * @property {'editProfile'} modalTypes.editProfile - 프로필 수정 모달
 */

export default function Modal() {
  const { isOpen, modalType, closeModal } = useModalStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  const ModalContent = () => {
    switch (modalType) {
      case 'create':
        return <CreateMeetingModal />;

      case 'editProfile':
        return <ProfileModal />;

      case 'signUp':
        return <SignUpModal />;

      default:
        return null;
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <ModalContent />
    </div>
  );
}
