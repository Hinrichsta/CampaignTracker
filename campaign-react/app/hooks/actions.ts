'use server';

import exp from "constants";
import { cookies } from "next/headers";
import CampaignJournal from "@/services/django";

export async function handleLogin(user:string, accessToken:string, refreshToken:string) {
    (await cookies()).set('session_user', user, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400, //One day in seconds
        path: '/'
    });

    (await cookies()).set('session_access', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600, //60 minutes in seconds
        path: '/'
    });

    (await cookies()).set('session_refresh', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400, //One day in seconds
        path: '/'
    });
}

export async function clearAuth() {
    (await cookies()).delete('session_user');
    (await cookies()).delete('session_access');
    (await cookies()).delete('session_refresh');
}

export async function updateToken() {
    const refreshToken = await getRefreshToken();
    (await cookies()).delete('session_access');
    const refreshData = {
        refresh: refreshToken
    }

    const response = await CampaignJournal.post(
        '/auth/renew/',
        JSON.stringify(refreshData)
    );

    if (response.access) {
        (await cookies()).set('session_access', response.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600, //60 minutes in seconds
            path: '/'
        });
    } else {
        console.log('error:', response)
        clearAuth();
    }
}

export async function getAuth() {
    const user = (await cookies()).get('session_user')?.value; //question mark makes this optional, and will return undefined if it doesn't exist

    return user ? user : null;
}

export async function getAuthToken() {
    let accessToken = (await cookies()).get('session_access')?.value;

    if (!accessToken){
        let accessToken = await updateToken();
    }

    return accessToken;
}

export async function getRefreshToken() {
    let refreshToken = (await cookies()).get('session_refresh')?.value;

    return refreshToken;
}