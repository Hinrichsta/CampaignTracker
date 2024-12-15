import { create } from "zustand";

interface AddPaymentsModalStore {
    modalOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddPaymentsModal = create<AddPaymentsModalStore>((set) => ({
    modalOpen: false,
    open: () => set({ modalOpen: true}),
    close: () => set({ modalOpen: false})
}));

export default useAddPaymentsModal;