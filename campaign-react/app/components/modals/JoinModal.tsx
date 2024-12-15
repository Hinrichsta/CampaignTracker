'use client';

import ModalTemplate from "./ModalTemplate";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useJoinModal from "@/app/hooks/Modals/useJoinModal";
import useSuccessModal from "@/app/hooks/Modals/useSuccessModal";
import CampaignJournal from "@/services/django";
import { handleLogin } from "@/app/hooks/actions";

const JoinModal = () => {
    const router = useRouter();
    const joinModal = useJoinModal();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [error, setError] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); //Success Modal
    const [showForm, setShowForm] = useState(true); //Success Modal

    const joinCampaign = async () =>{
        const joinData = {
            username: username,
            email: email,
            password: pass1,
            pass2: pass2
        }

        const response = await CampaignJournal.post(
            '/users/join',
            JSON.stringify(joinData)
        );

        if (response.access_token) {
            handleLogin(response.user.id,response.access_token,response.refresh_token)

            setEmail("");
            setPass1("");
            setPass2("");
            setError([]);

            setShowForm(false);//Success Modal
            setSuccessMessage("Thank you for Joining Us!"); //Success Modal

            setTimeout(() => { //Success Modal
                joinModal.close();
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
        <div>
            {showForm ? (
                <form className="space-y-3" action={joinCampaign}>
                    <input onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" type="username" className="px-4 w-full h-12 text-black rounded-lg" />
                    <input onChange={(e) => setEmail(e.target.value)} value={email}  placeholder="email" type="email" className="px-4 w-full h-12 text-black rounded-lg" />
                    <input onChange={(e) => setPass1(e.target.value)} placeholder="Password" type="password" className="px-4 w-full h-12 text-black rounded-lg"/>
                    <input onChange={(e) => setPass2(e.target.value)} placeholder="Confirm Password" type="password" className="px-4 w-full h-12 text-black rounded-lg"/>
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
            title="Join"
            content={content}
            modalOpen={joinModal.modalOpen}
            modalClose={joinModal.close}
        />
    )
}

export default JoinModal;