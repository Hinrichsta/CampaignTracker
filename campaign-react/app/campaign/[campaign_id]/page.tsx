import { CampaignCoreType } from "@/app/components/CampaignList"
import AddIncomeModal from "@/app/components/modals/addModals/AddIncomeModal";
import CampaignJournal from "@/services/django"

export default async function CampaignHomePage({
    params,
}: {
    params: Promise<{ campaign_id: string }>
}) {
    const cid = (await params).campaign_id

    const campaign = await CampaignJournal.get(`/campaigncore/${cid}`);

    
    
    
    return (
        <div className="flex h-full m-10">
            <AddIncomeModal 
                campaign_id={campaign.id}
            />
            <div className="flex-row w-full mx-14">
                <div className="h-64 my-24 bg-slate-500 text-white border-black border-4 rounded-xl shadow-xl text-center">
                    <h3 className="text-2xl">Funds</h3>
                </div>
                <div className="h-4/6 my-24 bg-slate-500 text-white border-black border-4 rounded-xl shadow-xl text-center">
                    <h3 className="text-2xl">Items</h3>
                </div>
            </div>
            <div className="flex-row w-full mx-10">
                <div className="h-96 my-24 bg-slate-500 text-white border-black border-4 rounded-xl shadow-xl text-center">
                    <h3 className="text-2xl">Quick Add</h3>
                </div>
                <div className="h-1/2 my-24 bg-slate-500 text-white border-black border-4 rounded-xl shadow-xl text-center">
                    <h3 className="text-2xl">Calendar</h3>
                </div>
            </div>

        </div>
    )
}