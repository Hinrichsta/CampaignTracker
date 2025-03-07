/*
* Login Modal
* 
* This will authenticate the user with the system, and then will store the cookie for request use
*/

'use client';

import ModalTemplate from "./ModalTemplate";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthModal from "@/app/hooks/Modals/useAuthModal";
import { handleLogin } from "../../hooks/actions";
import CampaignJournal from "@/services/django";

const AuthModal = () => {
    const router = useRouter();
    const authModal = useAuthModal()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); //Success Modal
    const [showForm, setShowForm] = useState(true); //Success Modal

    const submitAuth = async () =>{
        const authData = {
            username: username,
            password: password
        }
        const response = await CampaignJournal.post(
            '/auth/login/',
            JSON.stringify(authData)
        );
        if (response.access) {
            handleLogin(response.id as string,response.access,response.refresh)
            

            setUsername("")
            setPassword("")
            setError([])

            setShowForm(false);//Success Modal
            setSuccessMessage("Successfully Authenticated!"); //Success Modal

            setTimeout(() => { //Success Modal
                authModal.close();
                router.push('/home');
                setShowForm(true);
            }, 1000);
            
        } else {
            const errors: string[] = Object.values(response).map((error: any) => {
                return error
            } )
            setError(errors);
        }
    }

    const content = (
        <div className="p-6">
            {showForm ? (
                <form className="space-y-3" action={submitAuth}>
                    <input onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" type="username" className="px-4 w-full h-12 text-black rounded-lg" required/>
                    <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="px-4 w-full h-12 text-black rounded-lg" required/>
                    {error.map((error, index) => {
                        return (
                            <div key={`error_${index}`} className="text-red-600 text-lg">
                                <p>{error}<br /></p>
                            </div>
                        )
                    })}
                    <button className="w-full h-16 rounded-lg bg-blue-700 border-neutral-800 border-2 shadow-lg items-center justify-center text-center">
                        Submit
                    </button>
                </form>
            ) : (
                //Success Modal
                <div className="text-green-300 text-2xl text-center">
                    {successMessage}
                </div>
            )}
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