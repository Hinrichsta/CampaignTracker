import { create } from "zustand";

interface AuthModalStore {
    modalOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
    modalOpen: false,
    open: () => set({ modalOpen: true}),
    close: () => set({ modalOpen: false})
}));

export default useAuthModal;