/*
* This is the funds quick view componenet for the front page.
* It calls the funds calculations components and returns total funds and the individual funds for the logged in user
*/

'use client'

import { useState, useEffect } from "react";
import { PartyMemberType, ReceivablesType, PayablesType } from "@/app/hooks/DjangoTypes";
import CampaignJournal from "@/services/django";
import { calcIndivFunds, calcTotalFunds } from "@/app/hooks/calculations";
import { getAuth } from "@/app/hooks/actions";
import { useParams  } from "next/navigation";


const FundsQuickView = () => {  
    const params = useParams();
    const { campaign_id } = params;
    const [partyMembers, setPartyMembers] = useState<PartyMemberType[]>([]);
    const [receivables, setReceivables] = useState<ReceivablesType[]>([]);
    const [payables, setPayables] = useState<PayablesType[]>([]);
    const [totalFunds, setTotalFunds] = useState<Funds | undefined>(undefined);
    const [indivFunds, setIndivFunds] = useState<IndivFund[]>([]);
    const [user, setUser] = useState<string | null>()

    interface Funds {
        TotalGold: number;
        totalIncome: number;
        totalPayments: number;
    }

    interface IndivFund {
        id: string;
        name: string;
        totalFunds: number;
    }

    const fundsData = async () => {
        const party = await CampaignJournal.get(`/campaigncore/${campaign_id}/party/`)
        setPartyMembers(party);
        const user = await getAuth()
        setUser(user);
        const income = await CampaignJournal.get(`/campaigncore/${campaign_id}/receivables/`);
        setReceivables(income);
        const payments = await CampaignJournal.get(`/campaigncore/${campaign_id}/payables/`);
        setPayables(payments);
    }

    useEffect(() => {
        fundsData();
    }, []);
    

    useEffect(() => {
        const getFunds = async () => {
            const total = await calcTotalFunds(receivables,payables);
            setTotalFunds(total);
            const indiv = await calcIndivFunds(receivables,payables,partyMembers);
            setIndivFunds(indiv);
        }
        getFunds();
    }, [partyMembers, receivables, payables])

    const userIndivFund = user !== null ? indivFunds.find(fund => Number(fund.id) === (partyMembers.find(member => member.player === Number(user)))?.id) : undefined;

    return ( 
        <div className="flex pb-8 h-full w-full justify-center">
            <div className="flex flex-col pb-2 h-full w-full items-center justify-center">
                <div className="pb-7 h-1/2 w-11/12 bg-blue-700 border-neutral-800 rounded-lg border-2 shadow-lg text-center">
                    <h4 className="text-2xl">Total Group Funds</h4>
                    {totalFunds !== undefined ? (
                        <div className="p-5 h-full w-full border-neutral-800 border-t-2 items-center justify-center">
                            <p className="align-middle text-xl">{totalFunds.TotalGold} GP</p>
                        </div>
                    ) : (
                        <div className="p-5 h-full w-full border-neutral-800 border-t-2 items-center justify-center">
                            <p>Loading...</p>
                        </div>
                    )}
                </div>
                <div className="pb-7 h-1/2 w-11/12 bg-blue-700 border-neutral-800 rounded-lg border-2 shadow-lg items-center justify-center text-center">
                    <h4 className="text-2xl">Your Personal Funds</h4>
                    {userIndivFund ? (
                        <div className="p-5 h-full w-full border-neutral-800 border-t-2 items-center justify-center">
                            <p className="align-middle text-xl">{userIndivFund.totalFunds} GP {userIndivFund.id}</p>
                        </div>
                    ) : (
                        <div className="p-5 h-full w-full border-neutral-800 border-t-2 items-center justify-center">
                            <p>Loading...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

}

export default FundsQuickView;