'use client'

import { useState, useEffect } from "react";
import { useParams  } from "next/navigation";
import { PartyMemberType } from "@/app/hooks/DjangoTypes";
import CampaignJournal from "@/services/django";

const PartyList = () => {
    const params = useParams();
    const { campaign_id } = params;
    const [partyMembers, setPartyMembers] = useState<PartyMemberType[]>([]);

    const getParty = async () => {
        const party = await CampaignJournal.get(`/campaigncore/${campaign_id}/party/`)
        setPartyMembers(party);
    }

    useEffect(() => {
        getParty();
    }, []);

    return(
        <div>
            
        </div>
    )
}

export default PartyList;