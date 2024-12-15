'use client';

import ModalTemplate from "../ModalTemplate";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAddIncomeModal from "@/app/hooks/Modals/AddModals/useAddIncomeModal";
import { handleLogin } from "../../../hooks/actions";
import CampaignJournal from "@/services/django";

const AddIncomeModal = (campaign_id:any) => {
    const router = useRouter();
    const incomeModal = useAddIncomeModal()
    const [realDate, setRealDate] = useState("");
    const [worldDate, setworldDate] = useState("");
    const [description, setDescription] = useState("");
    const [platinum, setPlatinum] = useState("");
    const [gold, setGold] = useState("");
    const [silver, setSilver] = useState("");
    const [copper, setCopper] = useState("");
    const [partyTrans, setPartyTrans] = useState(true);
    const [indivPayee, setindivPayee] = useState("");
    const [error, setError] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); //Success Modal
    const [showForm, setShowForm] = useState(true); //Success Modal

    const submitIncome = async () =>{
        const incomeData = {
            irl_date: realDate,
            ig_date: worldDate,
            description: description,
            pp: platinum,
            gp: gold,
            sp: silver,
            cp: copper,
            party_trans: partyTrans,
            payer: indivPayee,
            campaign: campaign_id
        }
        console.log(incomeData)
        const response = await CampaignJournal.post(
            '/auth/login/',
            JSON.stringify(incomeData)
        );
        console.log(response)
        if (response.access) {
            handleLogin(response.id as string,response.access,response.refresh)
            

            setRealDate("")
            setworldDate("")
            setDescription("")
            setPlatinum("")
            setGold("")
            setSilver("")
            setCopper("")
            setPartyTrans(true)
            setindivPayee("")
            setError([])

            setShowForm(false);//Success Modal
            setSuccessMessage("Income Successfully Logged"); //Success Modal

            setTimeout(() => { //Success Modal
                incomeModal.close();
                router.push('/home');
                setShowForm(true);
            }, 1000);
            
        } else {
            const errors: string[] = Object.values(response).map((error: any) => {
                return error
            } )
            setError(errors);
        }
    }

    const PartyMembers = () => {
        
    }

    const partyMembers = CampaignJournal.get(
        `campaigncore/${campaign_id}/party/`
    )

    const content = (
        <div className="flex">
            {showForm ? (
                <form className="" action={submitIncome}>
                    <div className="pt-3">
                        <label className="px-2" htmlFor="date">Date</label>
                        <input onChange={(e) => setRealDate(e.target.value)} id="date" value={realDate} placeholder="Actual Date" type="date" className="px-4 h-12 w-full text-black rounded-lg" required/>
                    </div>
                    <div className="pt-3">
                        <label className="px-2" htmlFor="gameDate">In-Game Date</label>
                        <input onChange={(e) => setworldDate(e.target.value)} id="gameDate" value={worldDate} placeholder="In-Game World Date" type="text" className="px-4 h-12 w-full text-black rounded-lg"/>
                    </div>
                    <div className="pt-3">
                        <label className="px-2" htmlFor="desc">Transaction Description</label>
                        <input onChange={(e) => setDescription(e.target.value)} id="desc" value={description} placeholder="Description" type="text" className="px-4 h-12 w-full text-black rounded-lg" required/>
                    </div>
                    <div className="pt-3">
                        <label className="px-2" htmlFor="pp">Platinum</label>
                        <input onChange={(e) => setPlatinum(e.target.value)} id="pp" value={platinum} placeholder="Platinum" type="text" className="px-4 h-12 w-full text-black rounded-lg"/>
                    </div>
                    <div className="pt-3">
                        <label className="px-2" htmlFor="gp">Gold</label>
                        <input onChange={(e) => setGold(e.target.value)} id="gp" value={gold} placeholder="Gold" type="text" className="px-4 h-12 w-full text-black rounded-lg" required/>
                    </div>
                    <div className="pt-3">
                        <label className="px-2" htmlFor="sp">Silver</label>
                        <input onChange={(e) => setSilver(e.target.value)} id="sp" value={silver} placeholder="Silver" type="text" className="px-4 h-12 w-full text-black rounded-lg"/>
                    </div>
                    <div className="pt-3">
                        <label className="px-2" htmlFor="cp">Copper</label>
                        <input onChange={(e) => setCopper(e.target.value)} id="cp" value={copper} placeholder="Copper" type="text" className="px-4 h-12 w-full text-black rounded-lg" required/>
                    </div>
                    <div className="pt-6 text-xl flex-row">
                        <label className="px-2" htmlFor="partyTrans">Full Party Payment</label>
                        <input onChange={() => setPartyTrans(!partyTrans)} id="partyTrans" checked={partyTrans} type="checkbox" className="px-4 h-4 w-4 text-black rounded-lg"/>
                        <div>
                            <label className="px-2 text-sm" htmlFor="partyTrans">*leave checked to remove from general fund</label>
                        </div>
                    </div>
                    { partyTrans ? (
                        <></>
                    ) : (
                        <div className="pt-3">
                            <label className="px-2" htmlFor="indivPay">Payment to Individual</label>
                            <select onChange={(e) => setindivPayee(e.target.value)} id="indivPay" value={indivPayee} className="px-4 h-12 w-full text-black rounded-lg" required/>
                            {partyMembers.length > 0 ? ( 
                                partyMembers.map((member) => (
                                    <option>{member.character_name}</option>
                                ))
                            ) : ( 
                                <option></option>
                            ) }
                        </div>
                    )}
                    {error.map((error, index) => {
                        return (
                            <div key={`error_${index}`} className="text-red-600 text-lg">
                                <p>{error}<br /></p>
                            </div>
                        )
                    })}
                    <div className="pt-6">
                        <button className="w-full rounded-lg bg-blue-700 h-12">
                            Submit
                        </button>
                    </div>

                </form>
            ) : (
                //Success Modal
                <div className="text-green-300 text-2xl text-center">
                    {successMessage}
                </div>
            )}
        </div>

    )

    return (
        <ModalTemplate 
            title="Receive Payment"
            content={content}
            modalOpen={incomeModal.modalOpen}
            modalClose={incomeModal.close}
        />
    )
}

export default AddIncomeModal;