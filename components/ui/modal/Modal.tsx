/**
 * 전역 모달 상태를 관리하는 모달 컴포넌트입니다.
 *
 * useModalStore의 상태에 따라 다양한 유형의 모달을 렌더링합니다.
 *
 * 모달 외부 영역 클릭 시 자동으로 닫힙니다.
 */

'use client';

import React, { useEffect } from 'react';

import useModalStore from '@/store/useModalStore';

import CreateMeetingModal from './variants/CreateMeetingModal';
import CreateReviewModal from './variants/CreateReviewModal';
import DeleteMeetingModal from './variants/DeleteMeetingModal';
import LoginCheckModal from './variants/LoginCheckModal';
import ProfileModal from './variants/ProfileModal';
import SignUpModal from './variants/SignUpModal';

function ModalContent({ modalType, modalProps }: { modalType: string; modalProps?: any }) {
  switch (modalType) {
    case 'create':
      return <CreateMeetingModal />;
    case 'editProfile':
      return <ProfileModal />;
    case 'signUp':
      return <SignUpModal />;
    case 'loginCheck':
      return <LoginCheckModal />;
    case 'createReview':
      return <CreateReviewModal meetingId={modalProps?.meetingId || ''} />;
    case 'delete':
      return <DeleteMeetingModal />;
    default:
      return null;
  }
}

export default function Modal() {
  const { isOpen, modalType, modalProps, closeModal } = useModalStore();

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
      onKeyDown={(e) => e.key === 'Escape' && closeModal()}
      role="presentation"
    >
      <ModalContent modalType={modalType || ''} modalProps={modalProps} />
    </div>
  );
}
