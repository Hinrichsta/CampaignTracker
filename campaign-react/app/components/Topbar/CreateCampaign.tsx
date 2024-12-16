/*
* Create Campaign Button
* 
* Opens the Modal to create the Campaigns.
*/

'use client';

import useCreateCampaignModal from "@/app/hooks/Modals/useCreateCampaignModal";

const CreateCampaignButton = () =>{
    const createCampaignModal = useCreateCampaignModal();

    return(
        <div className="flex grow order-2 justify-end object-end relative">
            <button onClick={() => {createCampaignModal.open();}} className="hover:scale-105 rounded-lg w-64 h-16 m-6 bg-blue-700 text-2xl text-white border-neutral-800 border-2 shadow-lg items-center justify-center text-center">
                Create Campaign
            </button>
        </div>
    )
}

export default CreateCampaignButton;