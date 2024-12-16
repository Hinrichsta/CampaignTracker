import { create } from "zustand";

interface CreateCampaignModalStore {
    modalOpen: boolean;
    open: () => void;
    close: () => void;
}

const useCreateCampaignModal = create<CreateCampaignModalStore>((set) => ({
    modalOpen: false,
    open: () => set({ modalOpen: true}),
    close: () => set({ modalOpen: false})
}));

export default useCreateCampaignModal;