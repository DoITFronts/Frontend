import { create } from 'zustand';

type ModalType = 'create' | 'calendar' | 'signUp' | 'editProfile' | 'loginCheck' | 'createReview';

interface ModalState {
  isOpen: boolean;
  modalType: ModalType | null;
  modalProps?: any;
}

interface ModalStore extends ModalState {
  openModal: (type: ModalType, props?: any) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalType: null,
  modalProps: null,

  openModal: (type, props = {}) => {
    set({
      isOpen: true,
      modalType: type,
      modalProps: props,
    });
  },

  closeModal: () => {
    set({
      isOpen: false,
      modalType: null,
      modalProps: null,
    });
  },
}));

export default useModalStore;
