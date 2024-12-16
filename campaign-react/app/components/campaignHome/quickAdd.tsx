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
        <div className="px-6 ">
            <div className="flex flex-row pb-4">
                <div className="w-1/2 px-10 lg:text-xl md:text-xs">
                    <button className="hover:scale-105 w-full h-16 rounded-lg bg-blue-700 border-neutral-800 border-2 shadow-lg items-center justify-center text-center" onClick={() => {incomeModal.open();}}>
                        Add Income
                    </button>
                </div>
                <div className="w-1/2 px-10 lg:text-xl md:text-xs">
                    <button className="hover:scale-105 w-full h-16 rounded-lg bg-blue-700 border-neutral-800 border-2 shadow-lg items-center justify-center text-center"  onClick={() => {paymentsModal.open();}}>
                        Make Payment
                    </button>
                </div>
            </div>
            <div className="flex flex-row pt-4 pb-4">
                <div className="w-1/2 px-10 lg:text-xl md:text-xs">
                    <button disabled={true} className="opacity-60 hover:scale-105 w-full h-16 rounded-lg bg-blue-700 border-neutral-800 border-2 shadow-lg items-center justify-center text-center" onClick={() => {magicItemModal.open();}}>
                        Add Magic Item
                    </button>
                </div>
                <div className="w-1/2 px-10 lg:text-xl md:text-xs">
                    <button disabled={true} className="opacity-60 hover:scale-105 w-full h-16 rounded-lg bg-blue-700 border-neutral-800 border-2 shadow-lg items-center justify-center text-center" onClick={() => {consItemModal.open();}}>
                        Add Consumable Item
                    </button>
                </div>
            </div>
            <div className="flex flex-row pt-4">
                <div className="w-1/2 px-10 lg:text-xl md:text-xs">
                    <button disabled={true} className="opacity-60 hover:scale-105 w-full h-16 rounded-lg bg-blue-700 border-neutral-800 border-2 shadow-lg items-center justify-center text-center" onClick={() => {vehicleModal.open();}}>
                        Buy Vehicle
                    </button>
                </div>
                <div className="w-1/2 px-10 lg:text-xl md:text-xs">
                    <button disabled={true} className="opacity-60 hover:scale-105 w-full h-16 rounded-lg bg-blue-700 border-neutral-800 border-2 shadow-lg items-center justify-center text-center" onClick={() => {hireModal.open();}}>
                        Hire Someone
                    </button>
                </div>
            </div>
        </div>

    )
}

export default QuickAdd;