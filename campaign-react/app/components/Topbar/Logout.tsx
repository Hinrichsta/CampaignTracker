'use client';

import { useRouter } from "next/navigation";
import { logOut } from "@/app/hooks/actions";
import MenuLinks from "./MenuLinks";

const Logout: React.FC = () => {
    const router = useRouter();

    const logout = async () => {
        logOut();
        router.push('/home')
    }

    return (
        <MenuLinks 
            label='Logout'
            onClick={logout}
        />
    )
}

export default Logout;