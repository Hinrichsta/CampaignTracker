/*
* Magic Items Modal
* 
* It will take the information from the form and pass it to the backend to be added to the database
* 
* CURRENTLY IN PROGRESS
*/

'use client';

import ModalTemplate from "../ModalTemplate";
import { useEffect, useState, useCallback } from "react";
import { useParams  } from "next/navigation";
import useAddMagicItemModal from "@/app/hooks/Modals/AddModals/useAddMagicItemModal";
import CampaignJournal from "@/services/django";
import { PartyMemberType } from "@/app/hooks/DjangoTypes";

const AddMagicItemModal = () => {
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
    const [ownerOption, setOwnerOption] = useState("")
    const [partyOwner, setPartyOwner] = useState("");
    const [vehicleOwner, setVehicleOwner] = useState("");
    const [hirelingOwner, setHirelingOwner] = useState("");

    
    const [error, setError] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); //Success Modal
    const [showForm, setShowForm] = useState(true); //Success Modal
    const [partyMembers, setPartyMembers] = useState<PartyMemberType[]>([]);
    const getPartyMembers = useCallback(async () => {
        setPartyMembers(await CampaignJournal.get(`/campaigncore/${campaign_id}/party/`));
    }, [campaign_id]);

    useEffect(() => {
        getPartyMembers();
        const today = new Date();
        const currentDate = today.toISOString().split('T')[0]; // This gives the date in "yyyy-mm-dd" format
        setRealDate(currentDate);
    }, [getPartyMembers]);

    useEffect(() => {
        if (status !== "A") {
            setPartyOwner(""); 
            setVehicleOwner("");
            setHirelingOwner("");
        }
    }, [status]);

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
            powner: ownerOption === "P" ? Number(partyOwner) : null,
            vowner: ownerOption === "V" ? Number(vehicleOwner) : null,
            howner: ownerOption === "H" ? Number(hirelingOwner) : null,
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
            setOwnerOption("")
            setPartyOwner("")
            setVehicleOwner("")
            setHirelingOwner("")
            setError([])

            setShowForm(false);//Success Modal
            setSuccessMessage("Magic Item Succesfully Added"); //Success Modal

            setTimeout(() => { //Success Modal
                magicItemModal.close();
                window.location.reload();
                setShowForm(true);
            }, 1000);
            
        } else {
            const errors: string[] = Object.values(response).map((error: unknown) => {
                if (Array.isArray(error)) {
                    return error.filter((e): e is string => typeof e === 'string').join(' ');
                }
                if (typeof error === 'string') {
                    return error;
                }
                return '';
            });
            setError(errors);
            setRarity(rarity);
            setStatus(status);
            setCreator(creator);
        }
    }

    const content = (
        <div className= "px-4 py-4">
            {showForm ? (
                <form className="" action={submitMagicItem}>
                    <div className="flex">
                        <div className="pt-3 px-2 flex-row w-1/2">
                            <label className="px-2" htmlFor="date">Date</label>
                            <input onChange={(e) => setRealDate(e.target.value)} id="date" value={realDate} placeholder="Actual Date" type="date" className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg" required/>
                        </div>
                        <div className="pt-3 flex-row w-1/2">
                            <label className="px-2" htmlFor="gameDate">In-Game Date</label>
                            <input onChange={(e) => setworldDate(e.target.value)} id="gameDate" value={worldDate} placeholder="In-Game World Date" type="text" className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg"/>
                        </div>
                    </div>
                    <div className="pt-3 px-2">
                        <label className="px-2" htmlFor="name">Item Name</label>
                        <input onChange={(e) => setName(e.target.value)} id="sp" value={name} placeholder="Item Name" type="text" className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg" required/>
                    </div>
                    <div className="flex">
                        <div className="pt-3 px-2 flex-row w-1/2">
                            <label className="px-2" htmlFor="notes">Item Notes</label>
                        <textarea onChange={(e) => setNotes(e.target.value)} id="notes" value={notes} placeholder="Item Notes" className="px-4 py-[10px] h-48 min-h-12 max-h-96 w-full text-black text-balance resize-y border-neutral-800 border-2 shadow-lg rounded-lg"/>
                        </div>
                        <div className="pt-3 flex-row w-1/2">
                            <label className="px-2" htmlFor="rarity">Item Rarity</label>
                            <select onChange={(e) => setRarity(e.target.value)} id="rarity" value={rarity} className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg" required>
                                <option value=""></option>
                                <option value="C">Common</option>
                                <option value="U">Uncommon</option>
                                <option value="R">Rare</option>
                                <option value="V">Very Rare</option>
                                <option value="L">Legendary</option>
                                <option value="A">Artifact</option>
                            </select>
                            <label className="px-2" htmlFor="status">Item Status</label>
                            <select onChange={(e) => setStatus(e.target.value)} id="status" value={status} className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg" required>
                                <option value=""></option>
                                <option value="B">Stored</option>
                                <option value="A">Active</option>
                                <option value="D">Destroyed</option>
                                <option value="S">Sold</option>
                                <option value="L">Lost</option>
                                <option value="T">Stolen</option>
                                <option value="U">Used</option>
                            </select>
                            <label className="px-2" htmlFor="creator">Item Source</label>
                            <select onChange={(e) => setCreator(e.target.value)} id="creator" value={creator} className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg" required>
                                <option value=""></option>
                                <option value="O">Official</option>
                                <option value="H">Homebrew</option>
                            </select>
                        </div>
                    </div>
                    <div className="pt-3 px-2">
                        <label className="px-2" htmlFor="url">Item URL</label>
                        <input onChange={(e) => setLink(e.target.value)} id="url" value={link} placeholder="URL" type="url" className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg"/>
                    </div>
                    <div className="pt-3 px-2">
                        {status === "A" ? ( 
                            <>
                                <label className="px-2" htmlFor="Owner">Item Owner</label>
                                <div className="flex flex-row">
                                    <select onChange={(e) => setOwnerOption(e.target.value)} id="owner" value={ownerOption} className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg">
                                        <option value=""></option>
                                        <option value="P">Player</option>
                                        <option value="H" disabled>Hireling</option>
                                        <option value="v" disabled>Vehicle</option>
                                    </select>
                                
                                    {ownerOption === "P" ? (
                                        <> 
                                            <select onChange={(e) => setPartyOwner(e.target.value)} id="indivPay" value={partyOwner} className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg">
                                                <option value=""/>
                                                {partyMembers.length > 0 ? ( 
                                                    partyMembers.filter((member) => member.active).map((member) => (
                                                        <option key={member.id} value={member.id}>{member.character_name}</option>
                                                    ))
                                                ) : ( 
                                                    <option>No Active Party Members</option>
                                                ) }
                                            </select>
                                        </>
                                    ) : ownerOption === "H" ? (
                                        <>

                                        </>
                                    ) : ownerOption === "V" ? ( 
                                        <>

                                        </>
                                    ) : (
                                        <>
                                            <select id="blank" className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg" disabled/>
                                        </>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                            
                            </>
                        )}
                    </div>

                    {error.map((error, index) => {
                        return (
                            <div key={`error_${index}`} className="text-red-600 text-lg">
                                <p>{error}<br /></p>
                            </div>
                        )
                    })}
                    <div className="pt-6">
                        <button className="hover:scale-105 w-full h-16 rounded-lg bg-blue-700 border-neutral-800 border-2 shadow-lg items-center justify-center text-center">
                            Submit
                        </button>
                    </div>
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