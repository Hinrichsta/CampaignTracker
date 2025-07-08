import IncomeList from "@/app/components/finances/IncomeList"
import PaymentsList from "@/app/components/finances/PaymentsList"

export default function FinancesOverviewPage() {

    return (
        <div>
            <div>
                <IncomeList />
            </div>
            <div>
                <PaymentsList />
            </div>
        </div>
    )
}