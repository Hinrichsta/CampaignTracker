/*
* Party Member Modal
* 
* It will take the information from the form and pass it to the backend to be added to the database
*/


'use client';

import ModalTemplate from "../ModalTemplate";
import { useEffect, useState, useCallback } from "react";
import { useParams  } from "next/navigation";
import useAddPartyMemberModal from "@/app/hooks/Modals/AddModals/useAddPartyMemberModal";
import CampaignJournal from "@/services/django";
import { UserRolesType, UserType } from "@/app/hooks/DjangoTypes";

const AddPartyMemberModal = () => {
    const params = useParams();
    const { campaign_id } = params;
    const partyMemberModal = useAddPartyMemberModal();
    const [characterName, setcharacterName] = useState("");
    const [player, setPlayer] = useState<number | null>(null);
    const [className, setClassName] = useState("");
    const [species, setSpecies] = useState("");
    const [notes, setNotes] = useState("");
    const [active, setActive] = useState(true);
    const [joinDate, setJoinDate] = useState("");
    const [leaveDate, setLeaveDate] = useState<string | null>(null);
    const [campaignUsers, setCampaignUsers] = useState<UserType[]>([]);
    const getCampaignUsers = useCallback(async () => {
        try {
            const response = await CampaignJournal.get(`/campaigncore/${campaign_id}/campaignusers/`);
            const campaignUsersList: UserRolesType[] = response?.array || response;
            const campaignUserIDs = campaignUsersList.map(user => user.user);
            const userDetails = await Promise.all(
                campaignUserIDs.map(async (userID) => {
                    const details = await CampaignJournal.get(`/users/${userID}/?campaign=${campaign_id}`)
                    return details
                })
            );
            console.log("User Details:", userDetails);
            setCampaignUsers(userDetails);
        } catch (error) {
            console.error('Error fetching campaign users or user roles:', error);
        }
    }, [campaign_id]);

    const [error, setError] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); //Success Modal
    const [showForm, setShowForm] = useState(true); //Success Modal

    useEffect(() => {
        getCampaignUsers();
    }, [getCampaignUsers]);

    const addPartyMember = async () => {
        const memberData = {
            character_name: characterName,
            player: player,
            class_name: className,
            species: species,
            notes: notes,
            active: active,
            join_date: joinDate,
            leave_date: leaveDate,
            campaign:campaign_id
        };
        const response = await CampaignJournal.post(
            `/campaigncore/${campaign_id}/party/`,
            JSON.stringify(memberData)
        );

        if (response.id) {         
            setcharacterName("")
            setPlayer(null)
            setClassName("")
            setSpecies("")
            setNotes("")
            setActive(true)
            setJoinDate("")
            setLeaveDate(null)
            setError([])

            setShowForm(false);//Success Modal
            setSuccessMessage("Party Member Successfully Joined"); //Success Modal

            setTimeout(() => { //Success Modal
                partyMemberModal.close();
                window.location.reload();
                setShowForm(true);
                window.location.reload();
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
        }
    }


    const content = (
        <div className= "px-4 py-4">
            {showForm ? ( 
                <form className="" action={addPartyMember}>
                    <div className="flex">
                        <div className="pt-3 px-1 flex-row w-1/2">
                            <label className="px-2" htmlFor="char_name">Character Name</label>
                            <input onChange={(e) => setcharacterName(e.target.value)} id="char_name" value={characterName} placeholder="Character Name" type="text" className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg" required/>
                        </div>
                        <div className="pt-3 px-1 flex-row w-1/2">
                            <label className="px-2" htmlFor="player">Player</label>
                            <select onChange={(e) => setPlayer(Number(e.target.value) || null)} id="player" value={player || ""} className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg">
                                <option value=""/>
                                {campaignUsers.length > 0 ? ( 
                                    campaignUsers.map((member) => (
                                        <option key={member.id} value={member.id}>
                                            {member.first_name && member.first_name.trim() !== "" ? member.first_name + " " + member.last_name : member.username}
                                        </option>
                                    ))
                                ) : ( 
                                    <option>No users found</option>
                                ) }
                            </select>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="pt-3 px-1 flex-row w-1/2">
                            <label className="px-2" htmlFor="class">Class</label>
                            <input onChange={(e) => setClassName(e.target.value)} id="class" value={className} placeholder="Class" type="text" className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg" required/>
                        </div>
                        <div className="pt-3 px-1 flex-row w-1/2">
                            <label className="px-2" htmlFor="species">Species</label>
                            <input onChange={(e) => setSpecies(e.target.value)} id="species" value={species} placeholder="Species" type="text" className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg" required/>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="pt-3 px-1 flex-row w-1/2">
                            <label className="px-2" htmlFor="notes">Notes</label>
                            <input onChange={(e) => setNotes(e.target.value)} id="notes" value={notes} placeholder="Notes" type="text" className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg"/>
                        </div>
                        <div className="pt-3 px-1 flex-row w-1/2">
                            <label className="px-2" htmlFor="joinDate">Join Date</label>
                            <input onChange={(e) => setJoinDate(e.target.value)} id="joinDate" value={joinDate} placeholder="Date Joined" type="date" className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg" required/>
                        </div>
                    </div>
                    <div className="pt-6 text-xl flex-row">
                        <label className="px-2" htmlFor="active">Currently Active</label>
                        <input onChange={() => setActive(!active)} id="active" checked={active} type="checkbox" className="px-4 h-4 w-4 text-black border-neutral-800 border-2 shadow-lg"/>
                    </div>
                    { active ? (
                        <></>
                    ) : (
                        <div className="pt-3">
                            <div className="flex-row w-full">
                                <label className="px-2" htmlFor="leaveDate">Left Party Date</label>
                                <input onChange={(e) => setLeaveDate(e.target.value || null)} id="leaveDate" value={leaveDate || ""} placeholder="Date left" type="date" className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg" required/>
                            </div>
                        </div>
                    )}
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
    );

    return (
        <ModalTemplate 
            title="Add Party Member"
            content={content}
            modalOpen={partyMemberModal.modalOpen}
            modalClose={partyMemberModal.close}
        />
    )
}

export default AddPartyMemberModal;