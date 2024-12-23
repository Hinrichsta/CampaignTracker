/*
* Money Calculations
* 
* Calculates the total income for the campaign in terms of gold.
* Will Return the Total Party Gold or the gold for the individual party members.
* 
* Platinum = 10 gold, Gold = 1 gold, Silver = .1 Gold, Copper = .01 Gold
*/

import { PartyMemberType, PayablesType, ReceivablesType } from "./DjangoTypes";

interface IndividualFunds {
    name: string;
    totalIncome: number;
    totalPayments: number;
}

interface IndivFundsObject {
    [key: string]: IndividualFunds;
}

export function calcSingleTransaction(incomeData?:ReceivablesType,paymentData?:PayablesType){
    if (incomeData) {
        return parseFloat(((incomeData.pp * 10) + incomeData.gp + (incomeData.sp/10) + (incomeData.cp/100)).toFixed(2));
    } else if (paymentData){
        return parseFloat(((paymentData.pp * 10) + paymentData.gp + (paymentData.sp/10) + (paymentData.cp/100)).toFixed(2));
    } else {
        return 0
    }
}

export async function calcTotalFunds(incomeData:ReceivablesType[],paymentData:PayablesType[]){
    
    const incomePlatinum = parseFloat(incomeData.reduce((currentCoin:number, coin) => currentCoin + (coin.pp * 10), 0).toFixed(2));
    const incomeGold = parseFloat(incomeData.reduce((currentCoin:number, coin) => currentCoin + coin.gp, 0).toFixed(2));
    const incomeSilver = parseFloat(incomeData.reduce((currentCoin:number, coin) => currentCoin + (coin.sp/10), 0).toFixed(2));
    const incomeCopper = parseFloat(incomeData.reduce((currentCoin:number, coin) => currentCoin + (coin.cp/100), 0).toFixed(2));

    const paymentPlatinum = parseFloat(paymentData.reduce((currentCoin:number, coin) => currentCoin + (coin.pp * 10), 0).toFixed(2));
    const paymentGold = parseFloat(paymentData.reduce((currentCoin:number, coin) => currentCoin + coin.gp, 0).toFixed(2));
    const paymentSilver = parseFloat(paymentData.reduce((currentCoin:number, coin) => currentCoin + (coin.sp/10), 0).toFixed(2));
    const paymentCopper = parseFloat(paymentData.reduce((currentCoin:number, coin) => currentCoin + (coin.cp/100), 0).toFixed(2));

    const totalIncome = incomePlatinum + incomeGold + incomeSilver + incomeCopper
    const totalPayments = paymentPlatinum + paymentGold + paymentSilver + paymentCopper

    const TotalGold = totalIncome - totalPayments

    const result = {
        TotalGold: TotalGold,
        totalIncome: totalIncome,
        totalPayments: totalPayments
    }

    return result
}

export async function calcIndivFunds(incomeData:ReceivablesType[],paymentData:PayablesType[],partyList:PartyMemberType[]){

    const indivFunds:IndivFundsObject = partyList.reduce((out, Member) => {
        out[Member.id]= {
            name: Member.character_name,
            totalIncome: 0,
            totalPayments: 0,
        };
    return out;
    }, {} as IndivFundsObject);
    const memberCount = Object.keys(indivFunds).length;

    incomeData.forEach((coin) => {
        if (!coin.party_trans && coin.payer !== null) {
            const memberID = coin.payer;

            if (indivFunds[memberID]){
                indivFunds[memberID].totalIncome += (coin.pp ? (coin.pp * 10) : 0) + (coin.gp ? coin.gp : 0) + (coin.sp ? (coin.sp/10) : 0) + (coin.cp ? (coin.cp/100) : 0)
            }
        } else {
            const tmp = parseFloat((((coin.pp ? (coin.pp * 10) : 0) + (coin.gp ? coin.gp : 0) + (coin.sp ? (coin.sp/10) : 0) + (coin.cp ? (coin.cp/100) : 0))/memberCount).toFixed(2));

            Object.values(indivFunds).forEach(indiv => {
                indiv.totalIncome += tmp
            });
        }
    });

    paymentData.forEach((coin) => {
        if (!coin.party_trans && coin.payer !== null) {
            const memberID = coin.payer;

            if (indivFunds[memberID]){
                indivFunds[memberID].totalPayments += (coin.pp ? (coin.pp * 10) : 0) + (coin.gp ? coin.gp : 0) + (coin.sp ? (coin.sp/10) : 0) + (coin.cp ? (coin.cp/100) : 0)
            }
        } else {
            const tmp = parseFloat((((coin.pp ? (coin.pp * 10) : 0) + (coin.gp ? coin.gp : 0) + (coin.sp ? (coin.sp/10) : 0) + (coin.cp ? (coin.cp/100) : 0))/memberCount).toFixed(2));

            Object.values(indivFunds).forEach(indiv => {
                indiv.totalPayments += tmp
            });
        }
    });

    const result = Object.keys(indivFunds).map((memberId) => {
        const funds = indivFunds[memberId];

        const totalFunds = parseFloat((funds.totalIncome - funds.totalPayments).toFixed(2))

        return {
            id: memberId,
            name: funds.name,
            totalFunds: totalFunds,
            totalIncome: funds.totalIncome,
            totalPayments:funds.totalPayments
        };
    });

    return result;
}