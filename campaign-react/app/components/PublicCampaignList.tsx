'use client'

import { useEffect, useState } from "react";
import CampaignListItem from "./CampaignListItem";
import CampaignJournal from "@/services/django";
import { CampaignCoreType } from "../hooks/DjangoTypes";

const PublicCampaignList = () => {
    const [campaigns, setCampaigns] = useState<CampaignCoreType[]>([]);
    const getCampaigns = async () => {
        const endpoint = '/campaigncore/?public=True';
        const tmpCampaigns = await CampaignJournal.get(endpoint)
        console.log(tmpCampaigns)
        setCampaigns(tmpCampaigns);
    };

    useEffect(() => {
        getCampaigns();
    }, []);

    return (
        <div className="flex flex-row flex-wrap p-6">
            {campaigns.length > 0 ? (
                campaigns.map((campaign) => (
                    <CampaignListItem key={campaign.id} campaign={campaign} />
                ))
            ) : (
                <div className="flex-col items-center justify-center text-center text-xl">
                    <p>Unfortunately There doesn't appear to be any Public Campaigns available...</p>
                    <p>Why don't you join us and share your campaign for everyone to view!</p>
                </div>
            )}
        </div>
    );
}

export default PublicCampaignList;