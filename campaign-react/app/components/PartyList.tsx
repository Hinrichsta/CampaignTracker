'use client'

import { useState, useEffect } from "react";
import { useParams  } from "next/navigation";
import { PartyMemberType } from "@/app/hooks/DjangoTypes";
import CampaignJournal from "@/services/django";
import PartyMemberListItem from "./PartyListItem";
import useAddPartyMemberModal from "../hooks/Modals/AddModals/useAddPartyMemberModal";

const PartyList = () => {
    const params = useParams();
    const { campaign_id } = params;
    const [partyMembers, setPartyMembers] = useState<PartyMemberType[]>([]);
    const partyMemberModal = useAddPartyMemberModal();

    const getParty = async () => {
        const party = await CampaignJournal.get(`/campaigncore/${campaign_id}/party/`)
        setPartyMembers(party);
    }

    useEffect(() => {
        getParty();
    }, []);

    return(
        <div className="flex flex-row flex-wrap p-6">
            {partyMembers.length > 0 ? (
                <div className="w-full h-full items-center justify-center text-center">
                    <h2 className="p-2 pt-10 text-4xl font-bold">Active Members</h2>
                    {partyMembers.filter(member => member.active).map(member => (
                        <PartyMemberListItem key={member.id} member={member} />
                    ))}
                    <div className="w-full h-full items-center justify-center text-center">
                        <div className="flex w-full h-full items-center justify-center">
                            <div className="flex flex-col border-black rounded-lg min-w-80 m-6 shadow-xl bg-gray-500">
                                <div className="w-full text-center ">
                                    <div className="p-1 text-2xl font-bold text-white border-slate-400 border rounded-t-lg">
                                        <button onClick={() => {partyMemberModal.open();}}>Add Member</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="p-2 pt-10 text-4xl font-bold">Inactive Members</h2>
                    {partyMembers.filter(member => !member.active).map(member => (
                        <PartyMemberListItem key={member.id} member={member} />
                    ))}
                </div>
            ) : (
                <div className="p-6 text-2xl items-center justify-center text-center">
                    <h2 className="pb-6">Your Party is empty</h2>
                    <h2 >Please go to a Tavern and find one</h2>
                </div>
            )}
        </div>

    )
}

export default PartyList;