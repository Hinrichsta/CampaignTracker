'use client'

import { useEffect, useState } from "react";
import CampaignListItem from "./CampaignListItem";
import CampaignJournal from "@/services/django";

export type CampaignCoreType = {
    id: number;
    campaign_name: string;
    description: string;
    public: boolean;
}

const CampaignList = () => {

    
    const [campaigns, setCampaigns] = useState<CampaignCoreType[]>([]);
    const getCampaigns = async () => {
        setCampaigns((await CampaignJournal.get('/campaigncore/')).data);
    };

    useEffect(() => {
        getCampaigns();
    }, []);

    return (
        <>
            {campaigns.map((campaign) => {
                return (
                    <CampaignListItem
                        key={campaign.id}
                        campaigns={campaign}    
                    />
                );
            })}
        </>
    );
}

export default CampaignList;