'use client';

const CreateCampaignButton = () =>{
    return(
        <div className="flex grow order-2 justify-end object-end relative">
            <button className="border-black hover:scale-105 rounded-lg w-64 h-16 m-6 shadow-xl bg-blue-500 text-2xl text-white">
                Create Campaign
            </button>
        </div>
    )
}

export default CreateCampaignButton;