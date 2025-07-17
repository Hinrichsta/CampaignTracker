/*
* Loggout button
* 
* Sends the logout command to clear the cookies.
*/

'use client';
import { redirect } from "next/navigation";
import { logout } from "@/services/auth";
import MenuLinks from "./MenuLinks";

const Logout: React.FC = () => {
    const remove = async () => {
        logout();
        redirect('/home')
    }
    return (
        <MenuLinks 
            label='Logout'
            onClick={remove}
        />
    )
}

export default Logout;