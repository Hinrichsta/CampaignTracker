/*
* This is the home page for individual campaigns that will allow users to view quick information or add new information into the campaign
* 
*/

import { CampaignCoreType } from "@/app/hooks/DjangoTypes";
import AddIncomeModal from "@/app/components/modals/addModals/AddIncomeModal";
import AddPaymentModal from "@/app/components/modals/addModals/AddPaymentsModal";
import CampaignJournal from "@/services/django"
import QuickAdd from "@/app/components/campaignHome/QuickAdd";
import FundsQuickView from "@/app/components/campaignHome/Funds";


export default async function CampaignHomePage({
    params,
}: {
    params: Promise<{ campaign_id: string }>
}) {
    const cid:string = (await params).campaign_id

    const campaign = await CampaignJournal.get(`/campaigncore/${cid}`);

    return (
        <div className="flex h-full m-10">
            <AddIncomeModal 
                campaign_id={cid}
            />
            <AddPaymentModal 
                campaign_id={cid}
            />
            <div className="flex-row w-full mx-14">
                <div className="h-64 my-24 bg-slate-500 text-white border-black border-4 rounded-xl shadow-xl text-center">
                    <h3 className="text-2xl">Funds</h3>
                    <FundsQuickView 
                        campaign_id={cid}
                    />
                </div>
                <div className="h-4/6 my-24 bg-slate-500 text-white border-black border-4 rounded-xl shadow-xl text-center">
                    <h3 className="text-2xl">Items</h3>
                </div>
            </div>
            <div className="flex-row w-full mx-10">
                <div className="h-96 my-24 bg-slate-500 text-white border-black border-4 rounded-xl shadow-xl text-center">
                    <h3 className="text-2xl pb-8">Quick Add</h3>
                    <QuickAdd />
                </div>
                <div className="h-1/2 my-24 bg-slate-500 text-white border-black border-4 rounded-xl shadow-xl text-center">
                    <h3 className="text-2xl">Calendar</h3>
                </div>
            </div>

        </div>
    )
}