import { CampaignCoreType } from "@/app/components/CampaignList"
import CampaignJournal from "@/services/django"

export default async function IncomeDetailsPage({
    params,
}: {
    params: Promise<{ campaign_id: string }>
}) {
    const cid = (await params).campaign_id

    const campaign = await CampaignJournal.get(`/campaigncore/${cid}`);

    return (
        <div>
            Hello {campaign.campaign_name} Income Details
        </div>
    )
}