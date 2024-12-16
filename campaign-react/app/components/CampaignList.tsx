'use client'

import { useEffect, useState } from "react";
import CampaignListItem from "./CampaignListItem";
import CampaignJournal from "@/services/django";
import { CampaignCoreType } from "../hooks/DjangoTypes";


const CampaignList = () => {
    const [campaigns, setCampaigns] = useState<CampaignCoreType[]>([]);
    const getCampaigns = async () => {
        const endpoint = '/campaigncore/';
        const tmpCampaigns = await CampaignJournal.get(endpoint)

        setCampaigns(tmpCampaigns);
    };

    useEffect(() => {
        getCampaigns();
    }, []);

    return (
        <>
            <div className="flex flex-row flex-wrap p-6">
                {campaigns.length > 0 ? (
                    campaigns.filter((campaign) => !campaign.public).map((campaign) => (
                        <CampaignListItem key={campaign.id} campaign={campaign} />
                    ))
                ) : (
                    <div className="p-6 text-2xl items-center justify-center text-center">
                        <h2 className="pb-6">You are not a part of any campaigns.  Would you like to make one?</h2>
                        <h2 >Would you like to make one?</h2>

                    </div>

                )}
            </div>

        </>
    );
}

export default CampaignList;