import Link from "next/link";
import UserButton from "./UserButton";
import AuthModal from "../modals/AuthModal";
import JoinModal from "../modals/JoinModal";
const Topbar = () => {
    return(
        <div className="flex h-24 shrink-0 items-center justify-items-center rounded-lg bg-blue-900 p-4">
            <div className="flex grow order-1 justify-between space">
                <Link href="/home">
                    <h1 className="text-5xl object-left">Campaign Tracker</h1>
                </Link>
            </div>
            <UserButton />
        </div>
    )
}
export default Topbar;
