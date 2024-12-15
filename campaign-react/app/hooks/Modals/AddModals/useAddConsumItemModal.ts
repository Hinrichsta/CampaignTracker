import { create } from "zustand";

interface AddConsumeItemModalStore {
    modalOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddConsumeItemModal = create<AddConsumeItemModalStore>((set) => ({
    modalOpen: false,
    open: () => set({ modalOpen: true}),
    close: () => set({ modalOpen: false})
}));

export default useAddConsumeItemModal;