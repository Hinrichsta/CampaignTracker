/*
* Campaign List Items
* 
* Template for each item in the campaign lists.
*/

import Link from "next/link";
import { PartyMemberType } from "@/app/hooks/DjangoTypes";

interface PartyProps {
    member: PartyMemberType
}

const PartyMemberListItem: React.FC<PartyProps> = ({
    member,
}) => {
    return (
        <div>
            
        </div>
    )
}

export default PartyMemberListItem;