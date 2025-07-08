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
        <div className="w-full h-full items-center justify-center text-center">
            {member.active ? ( 
                <div className="flex w-full h-full items-center justify-center">
                    <div className="flex flex-col border-black rounded-lg min-w-80 m-6 shadow-xl bg-gray-500">
                        <div className="w-full text-center ">
                            <div className="p-1 text-2xl font-bold text-white border-slate-400 border rounded-t-lg">
                                <h1>{member.character_name}</h1>
                            </div>
                            <div>
                                <p>Player: {member.player}</p>
                                <p>Class: {member.class_name}</p>
                                <p>Species: {member.species}</p>
                                <p>Notes: {member.notes}</p>
                                <p>Join Date: {member.join_date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex w-full h-full items-center justify-center">
                    <div className="flex flex-col border-black rounded-lg min-w-80 m-6 shadow-xl bg-gray-700">
                        <div className="w-full text-center ">
                            <div className="p-1 text-2xl font-bold text-white border-slate-600 border rounded-t-lg">
                                <h1>{member.character_name}</h1>
                            </div>
                            <div>
                                <p>Player: {member.player}</p>
                                <p>Class: {member.class_name}</p>
                                <p>Species: {member.species}</p>
                                <p>Notes: {member.notes}</p>
                                <p>Join Date: {member.join_date}</p>
                                <p>Leave Date: {member.leave_date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PartyMemberListItem;