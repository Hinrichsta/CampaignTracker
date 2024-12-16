/*
* No Authentication Options
* 
* Will present options to the user if they are not signed in to sign up or log in.
*/

'use client';

import useAuthModal from "@/app/hooks/Modals/useAuthModal";
import useJoinModal from "@/app/hooks/Modals/useJoinModal";

const NoAuthButtons = () => {
    const authModal = useAuthModal();
    const joinModal = useJoinModal();

    return (
        <div className="flex-col  items-center justify-center text-center">
            <h2 className="text-2xl">Please Log In to View Campaigns</h2>
            <button onClick={() => authModal.open()} className="border-black hover:scale-105 rounded-lg w-32 h-16 m-6 shadow-xl bg-blue-500 text-xl text-white">
                Log In
            </button>
            <h2 className="text-2xl">signup to create your own or join others</h2>
            <button onClick={() => joinModal.open()} className="border-black hover:scale-105 rounded-lg w-32 h-16 m-6 shadow-xl bg-blue-500 text-xl text-white">
                Sign Up
            </button>
            <h2 className="text-2xl">Or Feel free to look around at some of the Publically Viewable Campaigns</h2>
        </div>
    )
}

export default NoAuthButtons;