import { PayablesType, ReceivablesType } from "./DjangoTypes";


export default function calcTotalFunds(incomeData:ReceivablesType[],PaymentData:PayablesType[]){
    
    const totalPlatinum = incomeData.reduce((currentPlatinum:number, platinum) => currentPlatinum + platinum.pp, 0);
    const totalGold = incomeData.reduce((currentPlatinum:number, platinum) => currentPlatinum + platinum.pp, 0);
    const totalSilver = incomeData.reduce((currentPlatinum:number, platinum) => currentPlatinum + platinum.pp, 0);
    const totalCopper = incomeData.reduce((currentPlatinum:number, platinum) => currentPlatinum + platinum.pp, 0);


}