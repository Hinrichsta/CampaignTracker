'use client'

import { useEffect, useRef, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";


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
            <button 
                ref={buttonRef}
                onClick={() => setsidebarOpen(!sidebarOpen)} 
                className="absolute left-5 bg-slate-400 text-black border-black border-2 rounded-full cursor-pointer shadow-xl" 
                >
                <ChevronRightIcon className="size-8 justify-center items-center text-center"/>
            </button>
            {sidebarOpen && (
                <div ref={sidebarRef} className="absolute left-0 border rounded-sm bg-slate-600 shadow-md flex flex-col cursor-pointer transition">
                    <ul>
                        <li><a href="#">Item 1</a></li>
                        <li><a href="#">Item 2</a></li>
                        <li><a href="#">Item 3</a></li>
                    </ul>
                </div>
            )}
        </div>
    )
};

export default Sidebar;