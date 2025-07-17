/*
* Home Page
* 
* The home page of the whole system.  Will Display the current Campaign lists
*/

import CampaignList from "../components/CampaignList";
import PublicCampaignList from "../components/PublicCampaignList";
import { getUserID } from "@/services/auth";
import NoAuthButtons from "./NoAuth";


export default async function HomePage() {
    const userAuth = await getUserID();
    return (
        <div className="flex flex-col flex-wrap">
            <div className="flex flex-col min-h-96 w-full border-black border-b-8 justify-start items-center">
                {userAuth ? ( 
                    <CampaignList />
                ) : (
                    <NoAuthButtons />
                )}
            </div>
            <div className="flex flex-col min-h-96 w-full border-black rounded-lg justify-start items-center">
                <PublicCampaignList />
            </div>
        </div>
    );
};