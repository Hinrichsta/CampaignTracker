/*
* Income Modal
* 
* It will take the information from the form and pass it to the backend to be added to the database
*/


'use client';

import ModalTemplate from "../ModalTemplate";
import { useEffect, useState } from "react";
import { useRouter,useParams  } from "next/navigation";
import useEditIncomeModal from "@/app/hooks/Modals/EditModals/useEditIncomeModal";
import CampaignJournal from "@/services/django";
import { PartyMemberType } from "@/app/hooks/DjangoTypes";
import { ReceivablesType } from "@/app/hooks/DjangoTypes";
import FundsQuickView from "../../campaignHome/Funds";


const EditIncomeModal = ( { entry } : { entry:ReceivablesType }) => {
    const router = useRouter();
    const params = useParams();
    const { campaign_id } = params;
    const incomeModal = useEditIncomeModal()
    const [entryID, setEntryID] = useState(0);
    const [realDate, setRealDate] = useState("");
    const [worldDate, setworldDate] = useState("");
    const [description, setDescription] = useState("");
    const [platinum, setPlatinum] = useState(0);
    const [gold, setGold] = useState(0);
    const [silver, setSilver] = useState(0);
    const [copper, setCopper] = useState(0);
    const [partyTrans, setPartyTrans] = useState(true);
    const [indivPayee, setindivPayee] = useState("");
    const [error, setError] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); //Success Modal
    const [showForm, setShowForm] = useState(true); //Success Modal
    const [partyMembers, setPartyMembers] = useState<PartyMemberType[]>([]);
    const getPartyMembers = async() => {
        setPartyMembers(await CampaignJournal.get(`/campaigncore/${campaign_id}/party/`));
        
    }

    useEffect(() => {
        getPartyMembers();
    }, []);

    useEffect(() => {
        if (partyTrans) {
            setindivPayee(String(null));  // Set indivPayee to null when partyTrans is true
        }
    }, [partyTrans]);

    useEffect(() => {
        setEntryID(entry.id)
        setRealDate(String(entry.irl_date))
        setworldDate(entry.ig_date)
        setDescription(entry.description!)
        setPlatinum(entry.pp)
        setGold(entry.gp)
        setSilver(entry.sp)
        setCopper(entry.cp)
        setPartyTrans(entry.party_trans)
        setindivPayee(String(entry.payer))
    }, [entry])

    const submitIncome = async () =>{
        const incomeData = {
            id: entryID,
            irl_date: realDate,
            ig_date: worldDate,
            description: description,
            pp: platinum,
            gp: gold,
            sp: silver,
            cp: copper,
            party_trans: partyTrans,
            payer: partyTrans ? null : Number(indivPayee),
            campaign: Number(campaign_id)
        }
        const response = await CampaignJournal.update(
            `/campaigncore/${campaign_id}/receivables/${entryID}/`,
            JSON.stringify(incomeData)
        );
        
        if (response.id) {         

            setRealDate("")
            setworldDate("")
            setDescription("")
            setPlatinum(0)
            setGold(0)
            setSilver(0)
            setCopper(0)
            setPartyTrans(true)
            setindivPayee("")
            setError([])

            setShowForm(false);//Success Modal
            setSuccessMessage("Income Successfully Updated"); //Success Modal

            setTimeout(() => { //Success Modal
                incomeModal.close();
                router.refresh();
                setShowForm(true);
                window.location.reload();
            }, 1000);
            
        } else {
            const errors: string[] = Object.values(response).map((error: any) => {
                return error
            } )
            setError(errors);
        }
    };

    const deleteIncome = async () => {
        const response = await CampaignJournal.delete(
            `/campaigncore/${campaign_id}/receivables/${entryID}/`
        );

        if (response.status === 204) {  // Status 204 means the delete was successful
            // You can show a success message or handle the UI after deletion
            setShowForm(false);
            setSuccessMessage("Income Successfully Deleted");

            setTimeout(() => {
                incomeModal.close();
                router.push(`/campaign/${campaign_id}/finances/income`);  // Redirect to the income list
                setShowForm(true);
                window.location.reload();  // Reload the page
            }, 1000);
        } else {
            const errors: string[] = Object.values(response).map((error: any) => {
                return error;
            });
            setError(errors);
        }
    };

    const content = (
        <div className="pr-10 pl-4 py-4">
            {showForm ? (
                <form className="" action={submitIncome}>
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
                            <input onChange={(e) => setPlatinum(Number(e.target.value))} id="pp" value={platinum} placeholder="Platinum" type="text" className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg"/>
                        </div>
                        <div className="pt-3 flex-row w-1/4">
                            <label className="px-2" htmlFor="gp">Gold</label>
                            <input onChange={(e) => setGold(Number(e.target.value))} id="gp" value={gold} placeholder="Gold" type="text" className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg"/>
                        </div>
                        <div className="pt-3 flex-row w-1/4">
                            <label className="px-2" htmlFor="sp">Silver</label>
                            <input onChange={(e) => setSilver(Number(e.target.value))} id="sp" value={silver} placeholder="Silver" type="text" className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg"/>
                        </div>
                        <div className="pt-3 flex-row w-1/4">
                            <label className="px-2" htmlFor="cp">Copper</label>
                            <input onChange={(e) => setCopper(Number(e.target.value))} id="cp" value={copper} placeholder="Copper" type="text" className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg"/>
                        </div>
                    </div>

                    <div className="pt-6 text-xl flex-row">
                        <label className="px-2" htmlFor="partyTrans">Full Party Income</label>
                        <input onChange={() => setPartyTrans(!partyTrans)} id="partyTrans" checked={partyTrans} type="checkbox" className="px-4 h-4 w-4 text-black border-neutral-800 border-2 shadow-lg"/>
                        <div>
                            <label className="px-2 text-sm" htmlFor="partyTrans">*leave checked to remove from general fund</label>
                        </div>
                    </div>
                    { partyTrans ? (
                        <></>
                    ) : (
                        <div className="pt-3">
                            <label className="px-2" htmlFor="indivPay">Payment to Individual</label>
                            <select onChange={(e) => setindivPayee(e.target.value)} id="indivPay" value={indivPayee} className="px-4 h-12 w-full text-black border-neutral-800 border-2 shadow-lg rounded-lg">
                                <option value=""/>
                                {partyMembers.length > 0 ? ( 
                                    partyMembers.map((member) => (
                                        <option key={member.id} value={member.id}>{member.character_name}</option>
                                    ))
                                ) : ( 
                                    <option></option>
                                ) }
                            </select>
                        </div>
                    )}
                    {error.map((error, index) => {
                        return (
                            <div key={`error_${index}`} className="text-red-400 text-lg">
                                <p>{error}<br /></p>
                            </div>
                        )
                    })}
                    <div className="flex pt-6">
                        <button onClick={deleteIncome} className="hover:scale-105 mx-2 w-20 h-16 rounded-lg bg-red-500 border-neutral-800 border-2 shadow-lg items-center justify-center text-center">
                            Delete
                        </button>
                        <button onClick={submitIncome} className="hover:scale-105 mx-2 w-full h-16 rounded-lg bg-blue-700 border-neutral-800 border-2 shadow-lg items-center justify-center text-center">
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
            title="Edit Income"
            content={content}
            modalOpen={incomeModal.modalOpen}
            modalClose={incomeModal.close}
        />
    )
}

export default EditIncomeModal;