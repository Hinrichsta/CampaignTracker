'use client'

import { useEffect, useState } from "react";
import CampaignListItem from "./CampaignListItem";
import CampaignJournal from "@/services/django";
import { CampaignCoreType } from "./CampaignList";

const PublicCampaignList = () => {

    
    const [campaigns, setCampaigns] = useState<CampaignCoreType[]>([]);
    const getCampaigns = async () => {
        const endpoint = '/campaigncore/?public=True';
        const tmpCampaigns = await CampaignJournal.get(endpoint)

        setCampaigns(tmpCampaigns);
    };

    useEffect(() => {
        getCampaigns();
    }, []);

    return (
        <div className="flex flex-row p-6">
            {campaigns.map((campaign) => {
                return (
                    <CampaignListItem
                        key={campaign.id}
                        campaigns={campaign}    
                    />
                );
            })}
        </div>
    );
}

export default PublicCampaignList;