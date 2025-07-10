import { create } from "zustand";

interface EditPartyMemberModalStore {
    modalOpen: boolean;
    open: () => void;
    close: () => void;
}

const useEditPartyMemberModal = create<EditPartyMemberModalStore>((set) => ({
    modalOpen: false,
    open: () => set({ modalOpen: true}),
    close: () => set({ modalOpen: false})
}));

export default useEditPartyMemberModal;