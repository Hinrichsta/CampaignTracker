import Link from "next/link";
import UserButton from "./UserButton";
import { getAuth } from "@/app/hooks/actions";
import CreateCampaignButton from "./CreateCampaign";

const Topbar = async() => {
    const userAuth = await getAuth();

    return(
        <div className="flex h-24 shrink-0 items-center justify-items-center rounded-lg bg-blue-900 p-4">
            <div className="flex grow order-1 justify-between space">
                <Link href="/home">
                    <h1 className="text-5xl object-left">Campaign Tracker</h1>
                </Link>
            </div>
            {userAuth ? ( 
                <CreateCampaignButton />
            ) : (
                <></>
            )}
            <UserButton
                userAuth = {userAuth}
             />
        </div>
    )
}

export default Topbar;
