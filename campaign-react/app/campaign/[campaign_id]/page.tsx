import { useRouter } from "next/router"
import { CampaignCoreType } from "@/app/components/CampaignList"

export default function CampaignHomePage() {
    const router = useRouter();
    const campaign = router.query;
    return (
        <div>
            Hello {campaign.campaign_name}
        </div>
    )
}