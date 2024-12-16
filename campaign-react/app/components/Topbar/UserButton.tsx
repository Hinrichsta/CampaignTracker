/*
* User Dropdown Button
* 
* Allows users to sign up, Sign In, or Log Out
*/

'use client';

import { useEffect, useRef, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline"; 
import MenuLinks from "./MenuLinks";
import useAuthModal from "@/app/hooks/Modals/useAuthModal";
import useJoinModal from "@/app/hooks/Modals/useJoinModal";
import Logout from "./Logout";

interface UserButtonProps {
    userAuth?: string | null;
}

const UserButton: React.FC<UserButtonProps> = ({
    userAuth
}) => {
    const [userDropdown, setUserDropdown] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null);
    const userRef = useRef<HTMLButtonElement>(null);
    const authModal = useAuthModal();
    const joinModal = useJoinModal();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && userRef.current && !userRef.current.contains(event.target as Node)) {
                setUserDropdown(false);
            }
        };
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, []);

    return(
        <div className="flex order-last justify-end object-right relative">
            <button
                ref={userRef}
                onClick={() => setUserDropdown(!userDropdown)}
            >
                <UserCircleIcon className="size-16 justify-end" />
            </button>
            
            {userDropdown && (
                <div ref={dropdownRef} className="w-40 top-20 absolute -right-4 border rounded-lg bg-slate-600 shadow-md flex flex-col cursor-pointer transition">
                    {userAuth ? (
                        <Logout />
                    ) : (
                        <>
                            <MenuLinks 
                                label='Login'
                                onClick={() => {
                                    authModal.open()
                                    setUserDropdown(false);
                                }}
                            />
                            <MenuLinks 
                                label='Sign Up'
                                onClick={() => {
                                    joinModal.open()
                                    setUserDropdown(false);
                                }}
                            />
                        </>
                    )}

                </div>
            )}
        </div>  
    )
}

export default UserButton;