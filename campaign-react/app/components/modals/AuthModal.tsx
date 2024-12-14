'use client';

import ModalTemplate from "./ModalTemplate";
import { useState } from "react";
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

    const submitAuth = async () =>{
        const authData = {
            username: username,
            password: password
        }

        const response = await CampaignJournal.post(
            '/auth/login',
            JSON.stringify(authData)
        );

        console.log(response)
        if (response.access_token) {
            handleLogin(response.user.id,response.access_token,response.refresh_token)
            authModal.close();

            const SuccessModal = () => {
                const message = "Your account was successfully created, please sign in."
            }
            router.push('/home')
            setError([])
        } else {
            const errors: string[] = Object.values(response).map((error: any) => {
                return error
            } )
            setError(errors);
        }
    }

    const content = (
        <div>
            <form className="space-y-3" action={submitAuth}>
                <input onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" type="username" className="px-4 w-full h-12 text-black rounded-lg" />
                <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="px-4 w-full h-12 text-black rounded-lg"/>
                {error.map((error, index) => {
                    return (
                        <div key={`error_${index}`} className="text-red-600 text-lg">
                            <p>{error}<br /></p>
                        </div>
                    )
                })}
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