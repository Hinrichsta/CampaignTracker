'use client';

import { XMarkIcon } from "@heroicons/react/24/outline"; 
import { useCallback, useEffect, useRef, useState } from "react";

interface ModalProps {
    title: string,
    content: React.ReactElement;
    modalOpen: boolean;
    modalClose: () => void;
}

const ModalTemplate: React.FC<ModalProps> = ({
    title,
    content,
    modalOpen,
    modalClose
}) => {
    const [modal, setModal] = useState(modalOpen)
    const modalRef = useRef<HTMLDivElement>(null);
    const openRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setModal(modalOpen)

        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node) && openRef.current && !openRef.current.contains(event.target as Node)) {
                setModal(false);
            }
        };
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [modalOpen]);

    const handleModalClose = useCallback(() => {
        setModal(false);

        setTimeout(() => {
            modalClose();
        },)
    }, [modalClose])

    if (!modalOpen) {
        return null;
    }

    return (
        <div className="flex items-center justify-center fixed inset-0 z-100 translate bg-black/40">
            <div className="relative w-6/12 md:w-6/12 lg:w-4/12 my-6">
                <div className={`translate h-full ${modal ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="w-full h-auto rounded-lg relative flex flex-col bg-slate-500">
                        <header className="flex items-center p-4 rounded-t-md justify-center border-b relative">
                            <div onClick={handleModalClose} className="p-3 absolute right-2 hover:bg-slate-500 rounded-full cursor-pointer">
                                <XMarkIcon className="size-8 justify-center"/>
                            </div>
                            <h2 className="text-4xl font-bold text-white"> {title} </h2>
                        </header>
                        <section className="p-6 text-slate-100">
                           {content}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalTemplate