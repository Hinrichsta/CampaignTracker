'use client'

import { useEffect, useRef, useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams } from 'next/navigation';

const Sidebar: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const params = useParams();
    const campaign_id = params.campaign_id; 

    //useEffect(() => {
    //    const handleClickOutside = (event: MouseEvent) => {
    //        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
    //            setSidebarOpen(false);
    //        }
    //    };
    //    document.addEventListener("click", handleClickOutside);
//
    //    return () => {
    //        document.removeEventListener("click", handleClickOutside);
    //    }
    //}, []);

    return(
        <div className="pt-5">
            <div ref={sidebarRef} className={`fixed left-3 border rounded-sm bg-slate-600 shadow-md flex flex-col h-full w-38 md:w-40 lg:w-64 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="fixed pt-6">
                    <button ref={buttonRef} onClick={() => setSidebarOpen(!sidebarOpen)} className={`absolute bg-slate-400 text-black border-black border-2 rounded-full cursor-pointer shadow-xl z-30 translate-x-36`}>
                            {sidebarOpen ? ( 
                                <ChevronLeftIcon className="h-8 w-8 justify-center items-center text-center"/>
                            ) : (
                                <ChevronRightIcon className="h-8 w-8 justify-center items-center text-center"/>
                            )}
                    </button>
                </div>
                {sidebarOpen && (
                <div>
                    <ul className="px-6 text-md text-left">
                        <Link href={`/campaign/${campaign_id}`}><li className="py-1">Home</li></Link>
                        <Link href={`/campaign/${campaign_id}/finances`}><li className="py-1">Transactions</li></Link>
                        <Link href={`/campaign/${campaign_id}/magic-items`}><li className="py-1">Items</li></Link>
                        <Link href={`/campaign/${campaign_id}/vehicles`}><li className="py-1">Vehicles</li></Link>
                        <Link href={`/campaign/${campaign_id}/hirelings`}><li className="py-1">Hirelings</li></Link>
                    </ul>
                </div>
            )}
            </div>
        </div>
    )
};

export default Sidebar;