import { create } from "zustand";

interface EditPaymentsModalStore {
    modalOpen: boolean;
    open: () => void;
    close: () => void;
}

const useEditPaymentsModal = create<EditPaymentsModalStore>((set) => ({
    modalOpen: false,
    open: () => set({ modalOpen: true}),
    close: () => set({ modalOpen: false})
}));

export default useEditPaymentsModal;