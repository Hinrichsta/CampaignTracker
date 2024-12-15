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
    const [partyTrans, setPartyTrans] = useState("");
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
            setPartyTrans("")
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

    const content = (
        <div>
            {showForm ? (
                <form className="space-y-3" action={submitIncome}>
                    <label htmlFor="date">Date</label>
                    <input onChange={(e) => setRealDate(e.target.value)} id="date" value={realDate} placeholder="Actual Date" type="date" className="px-4 w-full h-12 text-black rounded-lg" required/>
                    <label htmlFor="gameDate">In-Game Date</label>
                    <input onChange={(e) => setworldDate(e.target.value)} id="gameDate" value={worldDate} placeholder="In-Game World Date" type="text" className="px-4 w-full h-12 text-black rounded-lg"/>
                    <label htmlFor="desc">Transaction Description</label>
                    <input onChange={(e) => setDescription(e.target.value)} id="desc" value={realDate} placeholder="Description" type="text" className="px-4 w-full h-12 text-black rounded-lg" required/>
                    <label htmlFor="pp">Platinum</label>
                    <input onChange={(e) => setPlatinum(e.target.value)} id="pp" value={worldDate} placeholder="Platinum" type="text" className="px-4 w-full h-12 text-black rounded-lg"/>
                    <label htmlFor="gp">Gold</label>
                    <input onChange={(e) => setGold(e.target.value)} id="gp" value={realDate} placeholder="Gold" type="text" className="px-4 w-full h-12 text-black rounded-lg" required/>
                    <label htmlFor="sp">Silver</label>
                    <input onChange={(e) => setSilver(e.target.value)} id="sp" value={worldDate} placeholder="Silver" type="text" className="px-4 w-full h-12 text-black rounded-lg"/>
                    <label htmlFor="cp">Copper</label>
                    <input onChange={(e) => setCopper(e.target.value)} id="cp" value={realDate} placeholder="Copper" type="text" className="px-4 w-full h-12 text-black rounded-lg" required/>
                    <label htmlFor="partyTrans">Full Party Payment</label>
                    <input onChange={(e) => setPartyTrans(e.target.value)} id="partyTrans" value="true" type="radio" className="px-4 w-full h-12 text-black rounded-lg"/>
                    <label htmlFor="indivPay">Payment to Individual</label>
                    <input onChange={(e) => setindivPayee(e.target.value)} id="indivPay" value={realDate} placeholder="" type="text" className="px-4 w-full h-12 text-black rounded-lg" required/>
                    {error.map((error, index) => {
                        return (
                            <div key={`error_${index}`} className="text-red-600 text-lg">
                                <p>{error}<br /></p>
                            </div>
                        )
                    })}
                    <button className="w-full rounded-lg bg-blue-700 h-12">
                        Submit
                    </button>
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