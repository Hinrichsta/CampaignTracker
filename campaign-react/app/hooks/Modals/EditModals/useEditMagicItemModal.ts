import { create } from "zustand";

interface EditMagicItemModalStore {
    modalOpen: boolean;
    open: () => void;
    close: () => void;
}

const useEditMagicItemModal = create<EditMagicItemModalStore>((set) => ({
    modalOpen: false,
    open: () => set({ modalOpen: true}),
    close: () => set({ modalOpen: false})
}));

export default useEditMagicItemModal;