'use client';

import ModalTemplate from "../ModalTemplate";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAddPaymentsModal from "@/app/hooks/Modals/AddModals/useAddPaymentsModal";
import { handleLogin } from "../../../hooks/actions";
import CampaignJournal from "@/services/django";
import { PartyMemberType } from "@/app/hooks/DjangoTypes";

const AddPaymentModal = ({ campaign_id }: { campaign_id: string }) => {
    const router = useRouter();
    const paymentModal = useAddPaymentsModal()
    const [realDate, setRealDate] = useState("");
    const [worldDate, setworldDate] = useState("");
    const [description, setDescription] = useState("");
    const [platinum, setPlatinum] = useState("");
    const [gold, setGold] = useState("");
    const [silver, setSilver] = useState("");
    const [copper, setCopper] = useState("");
    const [payee, setPayee] = useState("");
    const [partyTrans, setPartyTrans] = useState(true);
    const [indivPayer, setindivPayer] = useState("");
    const [error, setError] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); //Success Modal
    const [showForm, setShowForm] = useState(true); //Success Modal

    const submitPayment = async () =>{
        const PaymentData = {
            irl_date: realDate,
            ig_date: worldDate,
            description: description,
            pp: platinum,
            gp: gold,
            sp: silver,
            cp: copper,
            party_trans: partyTrans,
            payee: payee,
            payer: indivPayer,
            campaign: campaign_id
        }
        const response = await CampaignJournal.post(
            '/auth/login/',
            JSON.stringify(PaymentData)
        );
        if (response.access) {
            handleLogin(response.id as string,response.access,response.refresh)
            

            setRealDate("")
            setworldDate("")
            setDescription("")
            setPlatinum("")
            setGold("")
            setSilver("")
            setCopper("")
            setPayee("")
            setPartyTrans(true)
            setindivPayer("")
            setError([])

            setShowForm(false);//Success Modal
            setSuccessMessage("Payment Successfully Logged"); //Success Modal

            setTimeout(() => { //Success Modal
                paymentModal.close();
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

    const [partyMembers, setPartyMembers] = useState<PartyMemberType[]>([]);
    const getPartyMembers = async() => {
        setPartyMembers(await CampaignJournal.get(`/campaigncore/${campaign_id}/party/`));
    }

    useEffect(() => {
        getPartyMembers();
    }, []);


    const content = (
        <div className="flex pr-10 pl-4 py-4">
            {showForm ? (
                <form className="" action={submitPayment}>
                    <div className="flex">
                        <div className="pt-3 px-2 flex-row w-1/2">
                            <label className="px-2" htmlFor="date">Date</label>
                            <input onChange={(e) => setRealDate(e.target.value)} id="date" value={realDate} placeholder="Actual Date" type="date" className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg" required/>
                        </div>
                        <div className="pt-3 flex-row w-1/2">
                            <label className="px-2" htmlFor="gameDate">In-Game Date</label>
                            <input onChange={(e) => setworldDate(e.target.value)} id="gameDate" value={worldDate} placeholder="In-Game World Date" type="text" className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg"/>
                        </div>
                    </div>
                    <div className="pt-3 px-2">
                        <label className="px-2" htmlFor="desc">Transaction Description</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} id="desc" value={description} placeholder="Description" className="px-4 py-[10px] h-12 min-h-12 max-h-96 w-full text-black text-balance resize-y border-neutral-800 border-2 shadow-lg rounded-lg" required/>
                    </div>
                    <div className="flex">
                        <div className="pt-3 flex-row w-1/4">
                            <label className="px-2" htmlFor="pp">Platinum</label>
                            <input onChange={(e) => setPlatinum(e.target.value)} id="pp" value={platinum} placeholder="Platinum" type="text" className="px-4 h-12 w-28 text-black border-neutral-800 border-2 shadow-lg rounded-lg"/>
                        </div>
                        <div className="pt-3 flex-row w-1/4">
                            <label className="px-2" htmlFor="gp">Gold</label>
                            <input onChange={(e) => setGold(e.target.value)} id="gp" value={gold} placeholder="Gold" type="text" className="px-4 h-12 w-28 text-black border-neutral-800 border-2 shadow-lg rounded-lg" required/>
                        </div>
                        <div className="pt-3 flex-row w-1/4">
                            <label className="px-2" htmlFor="sp">Silver</label>
                            <input onChange={(e) => setSilver(e.target.value)} id="sp" value={silver} placeholder="Silver" type="text" className="px-4 h-12 w-28 text-black border-neutral-800 border-2 shadow-lg rounded-lg"/>
                        </div>
                        <div className="pt-3 flex-row w-1/4">
                            <label className="px-2" htmlFor="cp">Copper</label>
                            <input onChange={(e) => setCopper(e.target.value)} id="cp" value={copper} placeholder="Copper" type="text" className="px-4 h-12 w-28 text-black border-neutral-800 border-2 shadow-lg rounded-lg" required/>
                        </div>
                    </div>
                    <div className="pt-3 px-2">
                        <label className="px-2" htmlFor="payee">Who is getting payed</label>
                        <input onChange={(e) => setPayee(e.target.value)} id="payee" value={copper} placeholder="Payee" type="text" className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg" required/>
                    </div>
                    <div className="pt-6 text-xl flex-row">
                        <label className="px-2" htmlFor="partyTrans">Full Party Payment</label>
                        <input onChange={() => setPartyTrans(!partyTrans)} id="partyTrans" checked={partyTrans} type="checkbox" className="px-4 h-4 w-4 text-black border-neutral-800 border-2 shadow-lg rounded-lg"/>
                        <div>
                            <label className="px-2 text-sm" htmlFor="partyTrans">*leave checked to remove from general fund</label>
                        </div>
                    </div>
                    { partyTrans ? (
                        <></>
                    ) : (
                        <div className="pt-3">
                            <label className="px-2" htmlFor="indivPay">Payment for Individual</label>
                            <select onChange={(e) => setindivPayer(e.target.value)} id="indivPay" value={indivPayer} className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg" required>
                                <option value=""/>
                                {partyMembers.length > 0 ? ( 
                                    partyMembers.map((member) => (
                                        <option key={member.id}>{member.character_name}</option>
                                    ))
                                ) : ( 
                                    <option></option>
                                ) }
                            </select>
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
                        <button className="w-full rounded-lg bg-blue-700 h-12 border-neutral-800 border-2 shadow-lg">
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
            title="Make Payment"
            content={content}
            modalOpen={paymentModal.modalOpen}
            modalClose={paymentModal.close}
        />
    )
}

export default AddPaymentModal;