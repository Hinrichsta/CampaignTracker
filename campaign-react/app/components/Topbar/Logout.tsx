'use client';

import { useRouter } from "next/navigation";
import { clearAuth } from "@/app/hooks/actions";
import MenuLinks from "./MenuLinks";

const Logout: React.FC = () => {
    const router = useRouter();

    const logout = async () => {
        clearAuth();
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