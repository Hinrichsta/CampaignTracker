import { create } from "zustand";

interface EditIncomeModalStore {
    modalOpen: boolean;
    open: () => void;
    close: () => void;
}

const useEditIncomeModal = create<EditIncomeModalStore>((set) => ({
    modalOpen: false,
    open: () => set({ modalOpen: true}),
    close: () => set({ modalOpen: false})
}));

export default useEditIncomeModal;