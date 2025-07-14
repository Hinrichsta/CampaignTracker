/*
* Public Campaign List
* 
* List all of the publically viewable campaigns in the system
* 
* The intent of this is to show campaigns but not allow them to be edited in anyway.  So that people can see what the application is like.
*/

'use client'

import { useEffect, useState, useCallback } from "react";
import CampaignListItem from "./CampaignListItem";
import CampaignJournal from "@/services/django";
import { CampaignCoreType } from "../hooks/DjangoTypes";

const PublicCampaignList = () => {
    const [campaigns, setCampaigns] = useState<CampaignCoreType[]>([]);
    const getCampaigns = useCallback(async () => {
        const endpoint = '/campaigncore/?public=True';
        const tmpCampaigns = await CampaignJournal.get(endpoint)
        setCampaigns(tmpCampaigns);
    }, []);

    useEffect(() => {
        getCampaigns();
    }, [getCampaigns]);

    return (
        <div className="flex flex-row flex-wrap p-6">
            {campaigns.length > 0 ? (
                campaigns.map((campaign) => (
                    <CampaignListItem key={campaign.id} campaign={campaign} />
                ))
            ) : (
                <div className="flex-col items-center justify-center text-center text-xl">
                    <p>Unfortunately There doesn&apos;t appear to be any Public Campaigns available...</p>
                    <p>Why don&apos;t you join us and share your campaign for everyone to view!</p>
                </div>
            )}
        </div>
    );
}

export default PublicCampaignList;