import { create } from "zustand";

interface JoinModalStore {
    modalOpen: boolean;
    open: () => void;
    close: () => void;
}

const useJoinModal = create<JoinModalStore>((set) => ({
    modalOpen: false,
    open: () => set({ modalOpen: true}),
    close: () => set({ modalOpen: false})
}));

export default useJoinModal;