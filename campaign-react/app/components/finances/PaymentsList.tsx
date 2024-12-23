'use client'

import { useState, useEffect } from "react";
import { ReceivablesType,PartyMemberType } from "@/app/hooks/DjangoTypes";
import CampaignJournal from "@/services/django";
import { calcSingleTransaction } from "@/app/hooks/calculations";
import { useParams  } from "next/navigation";


const PaymentsList = () => {
    const params = useParams();
    const { campaign_id } = params;
    const [PaymentsData, setPaymentsData] = useState<ReceivablesType[]>([]);
    const [partyMembers, setPartyMembers] = useState<PartyMemberType[]>([]);

    const getPayments = async () => {
        const party = await CampaignJournal.get(`/campaigncore/${campaign_id}/party/`)
        setPartyMembers(party);
        const payments = await CampaignJournal.get(`/campaigncore/${campaign_id}/payables/`);
        setPaymentsData(payments);
    }

    useEffect(() => {
        getPayments();
    }, []);

    return (
        <div className="mx-5">
        {PaymentsData.length > 0 ? (
            <table className="w-full text-center table-fixed border-black">
                <thead className="bg-blue-700 text-white border-b-4 border-black">
                    <tr className="border-black">
                        <th className="w-10 border-2 border-separate border-black">Date</th>
                        <th className="w-16 border-2 border-separate border-black">Game Date</th>
                        <th className="w-36 border-2 border-separate border-black">Description</th>
                        <th className="w-10 border-2 border-separate border-black">Platinum</th>
                        <th className="w-10 border-2 border-separate border-black">Gold</th>
                        <th className="w-10 border-2 border-separate border-black">Silver</th>
                        <th className="w-10 border-2 border-separate border-black">Copper</th>
                        <th className="w-10 border-2 border-separate border-black">Total in GP</th>
                        <th className="w-10 border-2 border-separate border-black">Owner</th>
                    </tr>
                </thead>
                <tbody className="text-white ">
                    {PaymentsData.map((entry) => (
                        <tr key={entry.id} className="border-2 border-separate border-black even:bg-slate-500 odd:bg-transparent">
                            <td className="border-2 border-separate border-black">{String(entry.irl_date)}</td>
                            <td className="border-2 border-separate border-black">{entry.ig_date}</td>
                            <td className="border-2 border-separate border-black">{entry.description}</td>
                            <td className="border-2 border-separate border-black">{entry.pp}</td>
                            <td className="border-2 border-separate border-black">{entry.gp}</td>
                            <td className="border-2 border-separate border-black">{entry.sp}</td>
                            <td className="border-2 border-separate border-black">{entry.cp}</td>
                            <td className="border-2 border-separate border-black">{calcSingleTransaction(entry)}</td>
                            { entry.party_trans ? ( 
                                <td className="border-2 border-separate border-black">Party</td>
                            ) : ( 
                                <td className="border-2 border-separate border-black">{partyMembers[partyMembers.findIndex(index => index.id === entry.payer)].character_name}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            ) : ( 
                <div className="text-5xl text-center">
                    <h1>
                        There are no transactions
                    </h1>
                </div>
            )}
        </div>
    )
}

export default PaymentsList;