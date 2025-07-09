/*
* Sign Up Modal
* 
* Allows a user to sign up for the service.
*/


'use client';

import ModalTemplate from "./ModalTemplate";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useJoinModal from "@/app/hooks/Modals/useJoinModal";
import CampaignJournal from "@/services/django";
import { handleLogin } from "@/app/hooks/actions";

const JoinModal = () => {
    const router = useRouter();
    const joinModal = useJoinModal();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [error, setError] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); //Success Modal
    const [showForm, setShowForm] = useState(true); //Success Modal

    const joinCampaign = async () =>{
        const joinData = {
            username: username,
            email: email,
            first_name: firstName,
            last_name: lastName,
            password: pass1,
            pass2: pass2
        }

        const response = await CampaignJournal.post(
            '/users/join/',
            JSON.stringify(joinData)
        );

        if (response.access_token) {
            handleLogin(response.user.id,response.access_token,response.refresh_token)

            setEmail("");
            setFirstName("");
            setLastName("");
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
        <div className="p-6">
            {showForm ? (
                <form className="space-y-3" action={joinCampaign}>
                    <input onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" type="username" className="px-4 w-full h-12 text-black rounded-lg" required/>
                    <input onChange={(e) => setEmail(e.target.value)} value={email}  placeholder="E-Mail" type="email" className="px-4 w-full h-12 text-black rounded-lg" required/>
                    <input onChange={(e) => setFirstName(e.target.value)} value={firstName}  placeholder="First Name" type="string" className="px-4 w-full h-12 text-black rounded-lg"/>
                    <input onChange={(e) => setLastName(e.target.value)} value={lastName}  placeholder="Last Name" type="string" className="px-4 w-full h-12 text-black rounded-lg"/>
                    <input onChange={(e) => setPass1(e.target.value)} placeholder="Password" type="password" className="px-4 w-full h-12 text-black rounded-lg" required/>
                    <input onChange={(e) => setPass2(e.target.value)} placeholder="Confirm Password" type="password" className="px-4 w-full h-12 text-black rounded-lg" required/>
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
            title="Join"
            content={content}
            modalOpen={joinModal.modalOpen}
            modalClose={joinModal.close}
        />
    )
}

export default JoinModal;