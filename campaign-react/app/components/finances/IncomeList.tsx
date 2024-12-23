'use client'

import { useState, useEffect } from "react";
import { ReceivablesType } from "@/app/hooks/DjangoTypes";
import CampaignJournal from "@/services/django";
import { calcIndivFunds, calcTotalFunds } from "@/app/hooks/calculations";
import { getAuth } from "@/app/hooks/actions";
import { useParams  } from "next/navigation";


const IncomeList = () => {
    const params = useParams();
    const { campaign_id } = params;
    const [incomeData, setIncomeData] = useState<ReceivablesType[]>([]);

    const getIncome = async () => {
        const income = await CampaignJournal.get(`/campaigncore/${campaign_id}/receivables/`);
        setIncomeData(income);
    }

    useEffect(() => {
        getIncome();
    }, []);

    return (
        <div className="mx-5">
        {incomeData.length > 0 ? (
            <table className="w-full text-center table-auto border-black">
                <thead className="bg-blue-700 text-white ">
                    <tr className="border-black">
                        <th className="border-4 border-separate border-black">Date</th>
                        <th className="border-4 border-separate border-black">Game Date</th>
                        <th className="border-4 border-separate border-black">Description</th>
                        <th className="border-4 border-separate border-black">Platinum</th>
                        <th className="border-4 border-separate border-black">Gold</th>
                        <th className="border-4 border-separate border-black">Silver</th>
                        <th className="border-4 border-separate border-black">Copper</th>
                        <th className="border-4 border-separate border-black">Owner</th>
                    </tr>
                </thead>
                <tbody className="text-white even:bg-slate-500 odd:bg-current">
                    {incomeData.map((entry) => (
                        <tr key={entry.id} className="border-2 border-separate border-black">
                            <td className="border-2 border-separate border-black">{String(entry.irl_date)}</td>
                            <td className="border-2 border-separate border-black">{entry.ig_date}</td>
                            <td className="border-2 border-separate border-black">{entry.description}</td>
                            <td className="border-2 border-separate border-black">{entry.pp}</td>
                            <td className="border-2 border-separate border-black">{entry.gp}</td>
                            <td className="border-2 border-separate border-black">{entry.sp}</td>
                            <td className="border-2 border-separate border-black">{entry.cp}</td>
                            { entry.party_trans ? ( 
                                <td className="border-2 border-separate border-black">Party</td>
                            ) : ( 
                                <td className="border-2 border-separate border-black">{entry.payer}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            ) : ( 
                <div className="text-5xl">
                    <h1>
                        There are no transactions.
                    </h1>
                </div>
            )}
        </div>
    )
}

export default IncomeList;