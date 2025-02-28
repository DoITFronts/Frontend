import { create } from 'zustand';

type ModalType = 'create' | 'calender' | 'signUp' | 'editProfile';

interface ModalState {
  isOpen: boolean;
  modalType: ModalType | null;
}

interface ModalStore extends ModalState {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalType: null,

  openModal: (type) => {
    set({
      isOpen: true,
      modalType: type,
    });
  },

  closeModal: () => {
    set({
      isOpen: false,
      modalType: null,
    });
  },
}));

export default useModalStore;
