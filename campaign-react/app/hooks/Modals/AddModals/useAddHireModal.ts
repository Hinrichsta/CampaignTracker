import { create } from "zustand";

interface AddHireModalStore {
    modalOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddHireModal = create<AddHireModalStore>((set) => ({
    modalOpen: false,
    open: () => set({ modalOpen: true}),
    close: () => set({ modalOpen: false})
}));

export default useAddHireModal;