'use client'

import { useEffect, useRef, useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";


const Sidebar: React.FC = () => {
    const [sidebarOpen, setsidebarOpen] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target as Node) && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setsidebarOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, []);

    return(
        <div className="pt-5">
            <div className={`fixed left-3 border rounded-sm bg-slate-600 shadow-md flex flex-col cursor-pointer h-full w-38 md:w-40 lg:w-64 transform transition-all duration-300 ease-in-out ${
                        sidebarOpen ? "translate-x-0" : "-translate-x-full"
                        }`}>
                <div className="absolute pt-6">
                    <button 
                        ref={buttonRef}
                        onClick={() => setsidebarOpen(!sidebarOpen)} 
                        className={`absolute bg-slate-400 text-black border-black border-2 rounded-full cursor-pointer shadow-xl z-20 ${
                            sidebarOpen ? "translate-x-60" : "translate-x-60"}`} 
                        >
                            {sidebarOpen ? ( 
                                <ChevronLeftIcon className="size-8 justify-center items-center text-center"/>
                            ) : (
                                <ChevronRightIcon className="size-8 justify-center items-center text-center"/>
                            )}
                    </button>
                </div> 
                {sidebarOpen && (
                <div 
                    ref={sidebarRef} 
                    >
                    <ul className="px-6 text-2xl text-left">
                        <li className="py-4"><a href="#">Item 1</a></li>
                        <li className="py-4"><a href="#">Item 2</a></li>
                        <li className="py-4"><a href="#">Item 3</a></li>
                    </ul>
                </div>
            )}
            </div>
        </div>
    )
};

export default Sidebar;