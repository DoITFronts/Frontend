import { create } from "zustand";

type ModalType =
  | "create"
  | "calendar"
  | "signUp"
  | "editProfile"
  | "loginCheck"
  | "createReview"
  | "delete";

interface ModalState {
  isOpen: boolean;
  modalType: ModalType | null;
  modalProps?: Record<string, any>; // 타입 명확하게 지정
}

interface ModalStore extends ModalState {
  openModal: (type: ModalType, props?: Record<string, any>) => void;
  closeModal: () => void;
}

const modalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalType: null,
  modalProps: undefined,

  openModal: (type, props) => {
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
      modalProps: undefined,
    });
  },
}));

export default modalStore;
