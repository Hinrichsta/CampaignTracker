'use client'

import { useState, useEffect } from "react";
import { useParams  } from "next/navigation";
import { PartyMemberType, UserType } from "@/app/hooks/DjangoTypes";
import CampaignJournal from "@/services/django";
import PartyMemberListItem from "./PartyListItem";
import useAddPartyMemberModal from "../hooks/Modals/AddModals/useAddPartyMemberModal";
import AddPartyMemberModal from "./modals/addModals/AddPartyMemberModal";
import useEditPartyMemberModal from "../hooks/Modals/EditModals/useEditPartyMemberModal";
import EditPartyMemberModal from "./modals/editModals/EditPartyMemberModal";

const PartyList = () => {
    const params = useParams();
    const { campaign_id } = params;
    const [partyMembers, setPartyMembers] = useState<PartyMemberType[]>([]);
    const [partyUsers, setPartyUsers] = useState<UserType[]>([])
    const [editMember, setEditMember] = useState<PartyMemberType>()
    const addPartyMemberModal = useAddPartyMemberModal();
    const editPartyMemberModal = useEditPartyMemberModal();

    const getParty = async () => {
        const party = await CampaignJournal.get(`/campaigncore/${campaign_id}/party/`)
        const userDetails = await Promise.all(
            party.map(async (member: PartyMemberType) => {
                if (member.player === null) return null
                try {
                    const details = await CampaignJournal.get(`/users/${member.player}/?campaign=${campaign_id}`)
                    return details
                } catch (error) {
                    console.error(`Failed to fetch user ${member.player}:`, error);
                    return null;
                }
            })
        )
        setPartyMembers(party);
        setPartyUsers(userDetails.filter((u): u is UserType => u !== null));
    }

    useEffect(() => {
        getParty();
    }, []);

    const handleCardClick = (cardData: PartyMemberType) => {
        setEditMember(cardData);
        editPartyMemberModal.open();
    }

    return(
        <>
            <AddPartyMemberModal />
            {editMember !== undefined ? (
                <EditPartyMemberModal member={editMember}/>
            ) : (
                <></>
            )}
            <div className="flex flex-row flex-wrap items-center justify-center text-center p-6">
                {partyMembers.length > 0 ? (
                    <div className="w-full h-full items-center justify-center text-center">
                        <h2 className="p-2 pt-10 text-4xl font-bold">Active Members</h2>
                        <div className="flex flex-row fles-wrap">
                            {partyMembers.filter(member => member.active).map(member => (
                                <PartyMemberListItem 
                                    key={member.id} 
                                    member={member} 
                                    memberDetails={partyUsers.find(user => user.id === member.player) || null} 
                                    onClick={() => handleCardClick(member)} />
                            ))}
                            <div className="w-full h-full">
                                <div className="flex w-full h-full items-center justify-center">
                                    <div className="flex flex-col hover:scale-105 border-black rounded-lg min-w-80 min-h-40 m-6 shadow-xl bg-blue-800 text-3xl font-bold text-white items-center justify-center text-center cursor-pointer" onClick={() => {addPartyMemberModal.open();}}>
                                        <h2>Add Member</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2 className="p-2 pt-10 text-4xl font-bold">Inactive Members</h2>
                        <div className="flex flex-row fles-wrap">
                            {partyMembers.filter(member => !member.active).map(member => (
                                <PartyMemberListItem 
                                    key={member.id} 
                                    member={member} 
                                    memberDetails={partyUsers.find(user => user.id === member.player) || null} 
                                    onClick={() => handleCardClick(member)}/>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="p-6 text-2xl items-center justify-center text-center">
                        <h2 className="pb-6">Your Party is empty</h2>
                        <h2 >Please go to a Tavern and find one</h2>
                    </div>
                )}
            </div>
        </>
    )
}

export default PartyList;