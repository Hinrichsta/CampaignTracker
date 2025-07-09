import { create } from "zustand";

interface AddPartyMemberModalStore {
    modalOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddPartyMemberModal = create<AddPartyMemberModalStore>((set) => ({
    modalOpen: false,
    open: () => set({ modalOpen: true}),
    close: () => set({ modalOpen: false})
}));

export default useAddPartyMemberModal;