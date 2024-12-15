import { create } from "zustand";

interface AddVehicleModalStore {
    modalOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddVehicleModal = create<AddVehicleModalStore>((set) => ({
    modalOpen: false,
    open: () => set({ modalOpen: true}),
    close: () => set({ modalOpen: false})
}));

export default useAddVehicleModal;