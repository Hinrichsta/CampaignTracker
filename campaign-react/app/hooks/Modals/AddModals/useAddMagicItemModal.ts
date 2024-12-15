import { create } from "zustand";

interface AddMagicItemModalStore {
    modalOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddMagicItemModal = create<AddMagicItemModalStore>((set) => ({
    modalOpen: false,
    open: () => set({ modalOpen: true}),
    close: () => set({ modalOpen: false})
}));

export default useAddMagicItemModal;