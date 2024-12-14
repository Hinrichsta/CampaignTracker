import { create } from "zustand";

interface SuccessModalStore {
    modalOpen: boolean;
    open: () => void;
    close: () => void;
}

const useSuccessModal = create<SuccessModalStore>((set) => ({
    modalOpen: false,
    open: () => set({ modalOpen: true}),
    close: () => set({ modalOpen: false})
}));

export default useSuccessModal;