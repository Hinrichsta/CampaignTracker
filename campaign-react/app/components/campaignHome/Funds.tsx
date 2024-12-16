'use client'

import { useState, useEffect } from "react";
import { PartyMemberType, ReceivablesType, PayablesType } from "@/app/hooks/DjangoTypes";
import CampaignJournal from "@/services/django";
import { calcIndivFunds, calcTotalFunds } from "@/app/hooks/calculations";
import { getAuth } from "@/app/hooks/actions";

const FundsQuickView = ({ campaign_id }: { campaign_id: string }) => {  
    const [partyMembers, setPartyMembers] = useState<PartyMemberType[]>([]);
    const [receivables, setReceivables] = useState<ReceivablesType[]>([]);
    const [payables, setPayables] = useState<PayablesType[]>([]);
    const [totalFunds, setTotalFunds] = useState<Funds | undefined>(undefined);
    const [indivFunds, setIndivFunds] = useState<IndivFund[]>([]);
    const [user, setUser] = useState(Number())

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

    const getPartyMembers = async() => {
        const tmp = await CampaignJournal.get(`/campaigncore/${campaign_id}/party/`)
        setPartyMembers(tmp);
        console.log('Party', partyMembers)
    }

    const getReceivables = async() => {
        const tmp = await CampaignJournal.get(`/campaigncore/${campaign_id}/receivables/`);
        setReceivables(tmp);
        console.log('Receivables', receivables)
    }

    const getPayables = async() => {
        const tmp = await CampaignJournal.get(`/campaigncore/${campaign_id}/payables/`);
        setPayables(tmp);
        console.log('Payables', payables)
    }
    

    const getUser = async() => {
        const tmp = await getAuth()
        console.log('User ID:', tmp)
        setUser(Number(tmp));
    }

    useEffect(() => {
        getPartyMembers();
        getReceivables();
        getPayables();
        getUser();
    }, []);
    

    const getTotalFunds = async() => {
        const tmp = await calcTotalFunds(receivables,payables);
        console.log('Total Funds:',tmp)
        setTotalFunds(tmp);
    }

    const getIndivFunds = async() => {
        const tmp = await calcIndivFunds(receivables,payables,partyMembers);
        console.log('Indiv Funds:',tmp)
        setIndivFunds(tmp);
    }

    useEffect(() => {
        getIndivFunds();
        getTotalFunds();
        console.log('Party', partyMembers)
        console.log('Receivables', receivables)
        console.log('Payables', payables)
    }, []);

    return ( 
        <div className="flex pb-8 h-full w-full">
            <div className="flex-col h-full w-full">
                <div className="pb-7 h-1/2 w-full bg-blue-700 border-neutral-800 rounded-lg border-2 shadow-lg items-center justify-center text-center">
                    <h4 className="text-xl">Total Group Funds</h4>
                    {totalFunds !== undefined ? (
                        <div className="p-5 h-full w-full border-neutral-800 border-t-2 items-center justify-center">
                            <p className="align-middle text-xl">{totalFunds.TotalGold} GP</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <div className="pb-7 h-1/2 w-full bg-blue-700 border-neutral-800 rounded-lg border-2 shadow-lg items-center justify-center text-center">
                    <h4 className="text-xl">Your Personal Funds</h4>
                    {user !== null && indivFunds.length > 0 ? (
                        <div className="p-5 h-full w-full border-neutral-800 border-t-2 items-center justify-center">
                            <p className="align-middle text-xl">{indivFunds[user].totalFunds} GP</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    )

}

export default FundsQuickView;