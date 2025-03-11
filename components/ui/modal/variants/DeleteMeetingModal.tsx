'use client';

import Icon from '@/components/shared/Icon';
import Button from '@/components/ui/Button';
import useModalStore from '@/store/useModalStore';

export default function DeleteMeetingModal() {
  const isOpen = useModalStore((state) => state.isOpen && state.modalType === 'delete');
  const closeModal = useModalStore((state) => state.closeModal);
  const modalProps = useModalStore((state) => state.modalProps);

  const handleConfirm = () => {
    if (modalProps?.onConfirm) {
      modalProps.onConfirm();
    }
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-10" onClick={closeModal} />
      <div className="relative inline-flex w-[400px] flex-col items-start justify-start gap-2.5 overflow-hidden rounded-xl border border-black bg-white p-6">
        <div className="flex h-auto w-full flex-col gap-6 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <div className="flex w-full justify-between">
            <span className="font-dunggeunmo text-xl text-black">{'< 모임 삭제 >'}</span>
            <button onClick={closeModal}>
              <Icon path="X" width="24" height="24" />
            </button>
          </div>
          <div className="flex w-full flex-col gap-6">
            <p className="text-base text-black-11">
              정말로 이 모임을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </p>
            <div className="flex w-full justify-end gap-2 p-2">
              <Button color="white" onClick={closeModal}>
                취소
              </Button>
              <Button color="filled" onClick={handleConfirm}>
                삭제
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
