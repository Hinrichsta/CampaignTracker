import { CampaignCoreType } from "./CampaignList";

interface CampaignProps {
    campaigns: CampaignCoreType
}


const CampaignListItem: React.FC<CampaignProps> = ({
    campaigns,
}) => {
    return (
        <div className="flex flex-col border-black  rounded-lg w-64 h-36 mx-6 shadow-md bg-purple-400">
            <div className="w-full text-center ">
                <div className="p-1 text-4xl font-bold text-white border-slate-400 bg-purple-600 border-b rounded-t-lg">
                    <h1>{campaigns.campaign_name}</h1>
                </div>
                <div className="p-1 text-lg text-white ">
                    <p>{campaigns.description}</p>
                </div>
            </div>
        </div>
    )
}

export default CampaignListItem;