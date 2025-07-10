/*
* Magic Items Modal
* 
* It will take the information from the form and pass it to the backend to be added to the database
* 
* CURRENTLY IN PROGRESS
*/

'use client';

import ModalTemplate from "../ModalTemplate";
import { useEffect, useState } from "react";
import { useRouter,useParams  } from "next/navigation";
import useAddMagicItemModal from "@/app/hooks/Modals/AddModals/useAddMagicItemModal";
import CampaignJournal from "@/services/django";
import { PartyMemberType } from "@/app/hooks/DjangoTypes";

const AddMagicItemModal = () => {
    const router = useRouter();
    const params = useParams();
    const { campaign_id } = params;
    const magicItemModal = useAddMagicItemModal();

    const [realDate, setRealDate] = useState("");
    const [worldDate, setworldDate] = useState("");
    const [name, setName] = useState("");
    const [notes, setNotes] = useState("");
    const [rarity, setRarity] = useState("");
    const [status, setStatus] = useState("");
    const [creator, setCreator] = useState("");
    const [link, setLink] = useState("");
    const [partyOwner, setPartyOwner] = useState(0);
    const [vehicleOwner, setVehicleOwner] = useState(0);
    const [hirelingOwner, setHirelingOwner] = useState(0);

    
    const [error, setError] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); //Success Modal
    const [showForm, setShowForm] = useState(true); //Success Modal

    const submitMagicItem = async () =>{
        const magicItemData = {
            irl_date: realDate,
            ig_date: worldDate,
            name: name,
            notes: notes,
            rarity: rarity,
            status: status,
            creator: creator,
            link: link,
            powner: partyOwner,
            vowner: vehicleOwner,
            howner: hirelingOwner,
            campaign: campaign_id
        }
        const response = await CampaignJournal.post(
            `/campaigncore/${campaign_id}/magic-items/`,
            JSON.stringify(magicItemData)
        );
        if (response.id) {
            setRealDate("")
            setworldDate("")
            setName("")
            setNotes("")
            setRarity("")
            setStatus("")
            setCreator("")
            setLink("")
            setPartyOwner(0)
            setVehicleOwner(0)
            setHirelingOwner(0)
            setError([])

            setShowForm(false);//Success Modal
            setSuccessMessage("Magic Item Succesfully Added"); //Success Modal

            setTimeout(() => { //Success Modal
                magicItemModal.close();
                router.refresh();
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
        <div>
            {showForm ? (
                <form className="space-y-3" action={submitAuth}>
                    <input onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" type="username" className="px-4 w-full h-12 text-black rounded-lg" required/>
                    <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="px-4 w-full h-12 text-black rounded-lg" required/>
                    {error.map((error, index) => {
                        return (
                            <div key={`error_${index}`} className="text-red-600 text-lg">
                                <p>{error}<br /></p>
                            </div>
                        )
                    })}
                    <button className="w-full rounded-lg bg-blue-700 h-12">
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
            title="Log Magic Item"
            content={content}
            modalOpen={magicItemModal.modalOpen}
            modalClose={magicItemModal.close}
        />
    )
}

export default AddMagicItemModal;