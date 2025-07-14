/*
* Public Campaign List
* 
* List all of the publically viewable campaigns in the system
* 
* The intent of this is to show campaigns but not allow them to be edited in anyway.  So that people can see what the application is like.
*/

'use client'

import { useEffect, useState, useCallback } from "react";
import { useParams  } from "next/navigation";
import Link from "next/link";
import CampaignJournal from "@/services/django";
import { CampaignCoreType } from "../hooks/DjangoTypes";


const CampaignTitle = () => {
    const params = useParams();
    const { campaign_id } = params;
    const [campaign, setCampaign] = useState<CampaignCoreType | undefined>(undefined);


    const getCampaign = useCallback(async () => {
        const endpoint = `/campaigncore/${campaign_id}/`;
        const tmpCampaign = await CampaignJournal.get(endpoint);
        setCampaign(tmpCampaign);
    }, [campaign_id]);

    useEffect(() => {
        getCampaign();
    }, [getCampaign]);

    return (
        <div className="flex w-50% items-center justify-center text-center align-bottom border-b-2 border-black">
            {campaign !== undefined ? (
            <Link href={`/campaign/${campaign_id}`}><h1 className="text-6xl">{campaign.campaign_name.replace(/'/g, "&apos;")}</h1></Link>
            ) : (
            <h1 className="text-4xl">The Title Isn&apos;t Showing</h1>
            )}
        </div>
    )
}

export default CampaignTitle;