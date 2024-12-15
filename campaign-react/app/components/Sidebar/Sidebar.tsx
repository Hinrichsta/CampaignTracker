'use client'

import { useEffect, useRef, useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams } from 'next/navigation';

const Sidebar: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const sidebarRef = useRef<HTMLDivElement>(null);

    const params = useParams();
    const campaign_id = params.campaign_id; 

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setSidebarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return(
        <div className="pt-5">
            <div ref={sidebarRef} className={`fixed left-3 border rounded-sm bg-slate-600 shadow-md flex flex-col h-full w-38 md:w-44 lg:w-64 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="fixed pt-6">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`absolute bg-slate-400 text-black border-black border-2 rounded-full cursor-pointer shadow-xl z-30 ${sidebarOpen ? "translate-x-[122px]" : "-translate-x-[18px]"} md:translate-x-[155px] lg:translate-x-[235px]`}>
                            {sidebarOpen ? ( 
                                <ChevronLeftIcon className="h-8 w-8 justify-center items-center text-center"/>
                            ) : (
                                <ChevronRightIcon className="h-8 w-8 justify-center items-center text-center"/>
                            )}
                    </button>
                </div>
                {sidebarOpen && (
                <div>
                    <ul className="px-6 sm:text-md md:text-lg lg:text-xl text-left w-full">
                        <Link href={`/campaign/${campaign_id}`}><li className="py-1" onClick={() => setSidebarOpen(!sidebarOpen)}>Home</li></Link>
                            <li className="py-1 relative" onClick={() => setSidebarOpen(!sidebarOpen)} onMouseEnter={(e) =>{const dropdown = e.currentTarget.querySelector('.dropdown'); if (dropdown) dropdown.classList.remove('hidden');}} onMouseLeave={(l) => {const dropdown = l.currentTarget.querySelector('.dropdown'); if (dropdown) dropdown.classList.add('hidden');}}>
                            <Link href={`/campaign/${campaign_id}/finances`}><div className="flex items-center space-x-2"><ChevronDownIcon className="h-4 w-4 justify-center items-center text-center"/><span>Transactions</span></div></Link>
                                <ul className="dropdown hidden pl-8">
                                    <Link href={`/campaign/${campaign_id}/finances/income`}><li className="py-1" onClick={() => setSidebarOpen(!sidebarOpen)}>Income</li></Link>
                                    <Link href={`/campaign/${campaign_id}/finances/payments`}><li className="py-1" onClick={() => setSidebarOpen(!sidebarOpen)}>Payments</li></Link>
                                </ul>
                            </li>
                            <li className="py-1 relative" onClick={() => setSidebarOpen(!sidebarOpen)} onMouseEnter={(e) =>{const dropdown = e.currentTarget.querySelector('.dropdown'); if (dropdown) dropdown.classList.remove('hidden');}} onMouseLeave={(l) => {const dropdown = l.currentTarget.querySelector('.dropdown'); if (dropdown) dropdown.classList.add('hidden');}}>
                            <Link href={`/campaign/${campaign_id}/items`}><div className="flex items-center space-x-2" onClick={() => setSidebarOpen(!sidebarOpen)}><ChevronDownIcon className="h-4 w-4 justify-center items-center text-center"/><span>Items</span></div></Link>
                                <ul className="dropdown hidden pl-8">
                                    <Link href={`/campaign/${campaign_id}/items/magic-items`}><li className="py-1" onClick={() => setSidebarOpen(!sidebarOpen)}>Magic Items</li></Link>
                                    <Link href={`/campaign/${campaign_id}/items/consummable-items`}><li className="py-1" onClick={() => setSidebarOpen(!sidebarOpen)}>Consumable Items</li></Link>
                                </ul>
                            </li>
                        <Link href={`/campaign/${campaign_id}/vehicles`}><li className="py-1" onClick={() => setSidebarOpen(!sidebarOpen)}>Vehicles</li></Link>
                        <Link href={`/campaign/${campaign_id}/hirelings`}><li className="py-1" onClick={() => setSidebarOpen(!sidebarOpen)}>Hirelings</li></Link>
                    </ul>
                </div>
            )}
            </div>
        </div>
    )
};

export default Sidebar;