'use client';

import ModalTemplate from "./ModalTemplate";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCreateCampaignModal from "@/app/hooks/Modals/useCreateCampaignModal";
import CampaignJournal from "@/services/django";

const CreateCampaignModal = () => {
    const router = useRouter();
    const CreateCampaignModal = useCreateCampaignModal()
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); //Success Modal
    const [showForm, setShowForm] = useState(true); //Success Modal

    const createCampaign = async () =>{
        const campaignData = {
            campaign_name: name,
            description: description,
            public: false
        }
        const response = await CampaignJournal.post(
            '/campaigncore/',
            JSON.stringify(campaignData)
        );
        if (response.id) {

            setName("")
            setDescription("")
            setError([])

            setShowForm(false);//Success Modal
            setSuccessMessage("Campaign Created!"); //Success Modal

            setTimeout(() => { //Success Modal
                CreateCampaignModal.close();
                router.push(`/campaign/${response.id}`);
                setShowForm(true);
            }, 1000);
            
        } else {
            const errors: string[] = Object.values(response).map((error: any) => {
                return error
            } )
            setError(errors);
        }
    }

    const content = (
        <div className="p-6">
            {showForm ? (
                <form className="space-y-3" action={createCampaign}>
                    <div className="pt-3 px-2 flex-row w-full">
                        <label className="px-2" htmlFor="name">In-Game Date</label>
                        <input onChange={(e) => setName(e.target.value)} id="name" value={name} placeholder="Username" type="text" className="px-4 w-full h-12 text-black rounded-lg" required/>
                    </div>
                    <div className="pt-3 px-2 flex-row w-full">
                        <label className="px-2" htmlFor="desc">Campaign Description</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} id="desc" value={description} placeholder="Description" className="px-4 py-[10px] h-12 min-h-12 max-h-96 w-full text-black text-balance resize-y border-neutral-800 border-2 shadow-lg rounded-lg" required/>
                    </div>
                    {error.map((error, index) => {
                        return (
                            <div key={`error_${index}`} className="text-red-600 text-lg">
                                <p>{error}<br /></p>
                            </div>
                        )
                    })}
                    <button className="hover:scale-105 w-full h-16 rounded-lg bg-blue-700 border-neutral-800 border-2 shadow-lg items-center justify-center text-center">
                        Submit
                    </button>
                </form>
            ) : (
                //Success Modal
                <div className="text-green-300 text-2xl text-center">
                    {successMessage}
                </div>
            )}
        </div>

    )

    return (
        <ModalTemplate 
            title="Login"
            content={content}
            modalOpen={CreateCampaignModal.modalOpen}
            modalClose={CreateCampaignModal.close}
        />
    )
}

export default CreateCampaignModal;