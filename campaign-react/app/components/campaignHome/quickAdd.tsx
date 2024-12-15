'use client'

import useAddIncomeModal from "@/app/hooks/Modals/AddModals/useAddIncomeModal";
import useAddPaymentsModal from "@/app/hooks/Modals/AddModals/useAddPaymentsModal";
import useAddMagicItemModal from "@/app/hooks/Modals/AddModals/useAddMagicItemModal";
import useAddConsumeItemModal from "@/app/hooks/Modals/AddModals/useAddConsumItemModal";
import useAddVehicleModal from "@/app/hooks/Modals/AddModals/useAddVehicleModal";
import useAddHireModal from "@/app/hooks/Modals/AddModals/useAddHireModal";


const QuickAdd = () => { 
    const incomeModal = useAddIncomeModal();
    const paymentsModal = useAddPaymentsModal();
    const magicItemModal = useAddMagicItemModal();
    const consItemModal = useAddConsumeItemModal();
    const vehicleModal = useAddVehicleModal();
    const hireModal = useAddHireModal();

    return (
        <div className="grid grid-cols-2 gap-10 px-10 text-xl">
            <button className="w-48 h-16 rounded-lg bg-emerald-700 border-neutral-800 border-2 shadow-lg" onClick={() => {incomeModal.open();}}>
                Add Income
            </button>

            <button className="w-48 h-16 rounded-lg bg-red-800 border-neutral-800 border-2 shadow-lg" onClick={() => {paymentsModal.open();}}>
                Make Payment
            </button>

            <button className="w-48 h-16 rounded-lg bg-blue-700 border-neutral-800 border-2 shadow-lg" onClick={() => {magicItemModal.open();}}>
                Add Magic Item
            </button>

            <button className="w-48 h-16 rounded-lg bg-orange-600 border-neutral-800 border-2 shadow-lg" onClick={() => {consItemModal.open();}}>
                Add Consummable Item
            </button>

            <button className="w-48 h-16 rounded-lg bg-violet-800 border-neutral-800 border-2 shadow-lg" onClick={() => {vehicleModal.open();}}>
                Buy Vehicle
            </button>

            <button className="w-48 h-16 rounded-lg bg-violet-800 border-neutral-800 border-2 shadow-lg" onClick={() => {hireModal.open();}}>
                Hire Someone
            </button>


        </div>
    )
}

export default QuickAdd;