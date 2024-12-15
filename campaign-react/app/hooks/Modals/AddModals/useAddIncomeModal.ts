import { create } from "zustand";

interface AddIncomeModalStore {
    modalOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddIncomeModal = create<AddIncomeModalStore>((set) => ({
    modalOpen: false,
    open: () => set({ modalOpen: true}),
    close: () => set({ modalOpen: false})
}));

export default useAddIncomeModal;