'use client';

import ModalTemplate from "./ModalTemplate";
import { useState } from "react";
import useAuthModal from "@/app/hooks/useAuthModal";

const AuthModal = () => {
    const authModal = useAuthModal()

    const content = (
        <div>
            <form className="space-y-3" action="">
                <input placeholder="Username" type="username" className="px-4 w-full h-12 text-black rounded-lg" />
                <input placeholder="Password" type="password" className="px-4 w-full h-12 text-black rounded-lg"/>
                <button className="w-full rounded-lg bg-blue-700 h-12">
                    Submit
                </button>
            </form>
        </div>

    )

    return (
        <ModalTemplate 
            title="Login"
            content={content}
            modalOpen={authModal.modalOpen}
            modalClose={authModal.close}
        />
    )
}

export default AuthModal;