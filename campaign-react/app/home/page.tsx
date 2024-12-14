import CampaignList from "../components/CampaignList"
import PublicCampaignList from "../components/PublicCampaignList"

export default function HomePage() {
    return (
        <div className="flex flex-col flex-wrap">
            <div className="flex flex-col min-h-96 w-full border-black border-b-8 justify-start items-center">
                Private Campaigns
            </div>
            <div className="flex flex-col min-h-96 w-full border-black rounded-lg justify-start items-center">
                <PublicCampaignList />
            </div>
            
        </div>
    )
}