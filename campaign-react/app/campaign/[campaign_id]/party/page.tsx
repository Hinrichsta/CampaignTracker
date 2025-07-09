import PartyList from "@/app/components/PartyList"
import AddPartyMemberModal from "@/app/components/modals/addModals/AddPartyMemberModal"

export default function PartyOverviewPage() {

    return (
        <div>
            <AddPartyMemberModal />
            <PartyList />
        </div>     
    )
}