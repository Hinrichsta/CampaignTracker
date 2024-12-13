import Link from "next/link";
import { CampaignCoreType } from "./CampaignList";

interface CampaignProps {
    campaign: CampaignCoreType
}


const CampaignListItem: React.FC<CampaignProps> = ({
    campaign,
}) => {
    return (
        <Link href={{
                pathname: `/campaign/${campaign.id}`,
                query: campaign
            }}>
            <div className="flex flex-col border-black hover:scale-105 rounded-lg w-64 h-36 mx-6 shadow-xl bg-purple-400">
                <div className="w-full text-center ">
                    <div className="p-1 text-4xl font-bold text-white border-slate-400 bg-purple-600 border-b rounded-t-lg">
                        <h1>{campaign.campaign_name}</h1>
                    </div>
                    <div className="p-1 text-lg text-white ">
                        <p>{campaign.description}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CampaignListItem;