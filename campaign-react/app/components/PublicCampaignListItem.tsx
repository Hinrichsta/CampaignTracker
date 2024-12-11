import { CampaignCoreType } from "./CampaignList";

interface CampaignProps {
    campaign: CampaignCoreType
}

export default function CampaignListItem({
    campaign,
}: {
    campaign: CampaignCoreType;
}) {

    return (
        <>
        <h1>{campaign.name}</h1>
        </>
    )
} 