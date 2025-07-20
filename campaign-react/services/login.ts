import { encrypt } from "./auth";
import { cookies } from "next/headers";
import CampaignJournal from "@/services/django";


export async function login(username: string, password: string) {
    const cookieStore = await cookies();
    const authData = {
        username: username,
        password: password
    };
    // Authenticate with Django API
    const response = await CampaignJournal.post(
        '/auth/login/',
        JSON.stringify(authData)
    );
    
    if (response.access) {
        const userID = encrypt(response, "1 day")
        const accessToken = encrypt(response.access, "1 hour")
        const refreshToken = encrypt(response.refresh, "1 day")

        cookieStore.set('session_id', String(userID), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400, //One day in seconds
            sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
            path: '/'
        });
        cookieStore.set('session_access', String(accessToken), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600, //60 minutes in seconds
            sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
            path: '/'
        });
        cookieStore.set('session_refresh', String(refreshToken), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400, //One day in seconds
            sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
            path: '/'
        });
        return response;
    }
    return response;
}