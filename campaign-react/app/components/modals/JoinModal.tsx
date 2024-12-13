'use client';

import ModalTemplate from "./ModalTemplate";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useJoinModal from "@/app/hooks/useJoinModal";
import CampaignJournal from "@/services/django";

const JoinModal = () => {
    const router = useRouter();
    const joinModal = useJoinModal();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [error, setError] = useState<string[]>([]);

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

        console.log(response)
        if (response.message == "User created successfully") {
            joinModal.close();

            router.push('/home')
        } else {
            const errors: string[] = Object.values(response).map((error: any) => {
                return error
            } )

            setError(errors);
        }
    }

    const content = (
        <div>
            <form className="space-y-3" action={joinCampaign}>
                <input onChange={(e) => setUsername(e.target.value)} placeholder="Username" type="username" className="px-4 w-full h-12 text-black rounded-lg" />
                <input onChange={(e) => setEmail(e.target.value)} placeholder="email" type="email" className="px-4 w-full h-12 text-black rounded-lg" />
                <input onChange={(e) => setPass1(e.target.value)} placeholder="Password" type="password" className="px-4 w-full h-12 text-black rounded-lg"/>
                <input onChange={(e) => setPass2(e.target.value)} placeholder="Confirm Password" type="password" className="px-4 w-full h-12 text-black rounded-lg"/>
                {error.map((error, index) => {
                    return (
                        <div key={`error_${index}`} className="text-red-500 text-lg">
                            <p>{error}</p>
                        </div>
                    )
                })}
                <button onClick={joinCampaign} className="w-full rounded-lg bg-blue-700 h-12">
                    Submit
                </button>
            </form>
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