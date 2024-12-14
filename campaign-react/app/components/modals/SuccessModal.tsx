'use client';

import ModalTemplate from "./ModalTemplate";
import { useState } from "react";
import useSuccessModal from "@/app/hooks/Modals/useSuccessModal";

const SuccessModal = (message:string) => {
    const SuccessModal = useSuccessModal()

    const content = (
        <div>
            <form className="space-y-3" action="">
                <h3>{message}</h3>
            </form>
        </div>

    )

    return (
        <ModalTemplate 
            title="Login"
            content={content}
            modalOpen={SuccessModal.modalOpen}
            modalClose={SuccessModal.close}
        />
    )
}

export default SuccessModal;