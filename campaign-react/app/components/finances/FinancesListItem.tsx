import { PartyMemberType} from "@/app/hooks/DjangoTypes";

interface IndivFund {
    id: string;
    name: string;
    totalFunds: number;
}

interface FinacesProps {
    indivFunds: IndivFund;
    active: boolean | undefined;
}

const FinancesListItem: React.FC<FinacesProps> = ({
    indivFunds,
    active
}) => {
    return (
        <>
            { active ? ( 
                <div className="flex flex-col hover:scale-105 border-black rounded-lg min-w-80 m-6 shadow-xl bg-blue-800 cursor-pointer">
                    <div className="flex flex-col w-full min-h-16 text-center justify-between">
                        <div className="p-1 text-3xl font-bold text-white border-b-black border-b">
                            <h1>{indivFunds.name}</h1>
                        </div>
                        <div className="p-1 text-2xl font-bold text-white flex-grow flex items-center justify-center">
                        {indivFunds.totalFunds !== undefined ? ( 
                            <h2>{indivFunds.totalFunds} GP</h2>
                        ) : (
                            <h2>Loading...</h2>
                        )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col hover:scale-105 border-black rounded-lg min-w-80 m-6 shadow-xl bg-gray-700 cursor-pointer">
                    <div className="flex flex-col w-full min-h-16 text-center justify-between">
                        <div className="p-1 text-3xl font-bold text-white border-b-black border-b">
                            <h1>{indivFunds.name}</h1>
                        </div>
                        <div className="p-1 text-2xl font-bold text-white flex-grow flex items-center justify-center">
                        {indivFunds.totalFunds !== undefined ? ( 
                            <h2>{indivFunds.totalFunds} GP</h2>
                        ) : (
                            <h2>Loading...</h2>
                        )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default FinancesListItem;






