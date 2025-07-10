/*
* Campaign List Items
* 
* Template for each item in the campaign lists.
*/

import Link from "next/link";
import { PartyMemberType,UserType } from "@/app/hooks/DjangoTypes";

interface PartyProps {
    member: PartyMemberType
    memberDetails: UserType | null
    onClick?: () => void;
}

const PartyMemberListItem: React.FC<PartyProps> = ({
    member,
    memberDetails,
    onClick
}) => {
    return (
        <div className="w-full h-full items-center justify-center text-center">
            {member.active ? ( 
                <div className="flex w-full h-full items-center justify-center">
                    <div className="flex flex-col hover:scale-105 border-black rounded-lg min-w-80 m-6 shadow-xl bg-blue-800 cursor-pointer" onClick={onClick}>
                        <div className="w-full text-center ">
                            <div className="p-1 text-2xl font-bold text-white border-b-black border-b">
                                <h1>{member.character_name}</h1>
                            </div>
                            <div>
                                <p>Player: {memberDetails !== null ? (memberDetails.first_name && memberDetails.first_name.trim() !== "" ? memberDetails.first_name + " " + memberDetails.last_name : memberDetails.username) : null}</p>
                                <p>Class: {member.class_name}</p>
                                <p>Species: {member.species}</p>
                                <p>Notes: {member.notes}</p>
                                <p>Join Date: {String(member.join_date)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex w-full h-full items-center justify-center">
                    <div className="flex flex-col hover:scale-105 border-black rounded-lg min-w-80 m-6 shadow-xl bg-gray-700 cursor-pointer" onClick={onClick}>
                        <div className="w-full text-center ">
                            <div className="p-1 text-2xl font-bold text-white border-slate-600 border-b">
                                <h1>{member.character_name}</h1>
                            </div>
                            <div>
                                <p>Player: {memberDetails !== null ? (memberDetails.first_name && memberDetails.first_name.trim() !== "" ? memberDetails.first_name + " " + memberDetails.last_name : memberDetails.username) : null}</p>
                                <p>Class: {member.class_name}</p>
                                <p>Species: {member.species}</p>
                                <p>Notes: {member.notes}</p>
                                <p>Join Date: {String(member.join_date)}</p>
                                <p>Leave Date: {String(member.leave_date)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PartyMemberListItem;