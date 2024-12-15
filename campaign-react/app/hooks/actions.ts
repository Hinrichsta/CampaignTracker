'use server';

import { cookies } from "next/headers";

export async function handleLogin(user:string, accessToken:string, refreshToken:string) {
    
    (await cookies()).set('session_user', user, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400, //One day in seconds
        sameSite: 'strict',
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
        sameSite: 'strict',
        path: '/'
    });
}

export async function clearAuth() {
    (await cookies()).delete('session_user');
    (await cookies()).delete('session_access');
    (await cookies()).delete('session_refresh');
}

export async function updateToken() {
    try {
        const refreshToken = await getRefreshToken();
    
        const accessToken = await fetch('http://localhost:8000/api/v1/auth/renew/', {
            method: 'POST',
            body: JSON.stringify({
                refresh: refreshToken
            }),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            }
        });
    
        const json = await accessToken.json()
    
        if (json.access) {
            const cookieStore = await cookies();
            cookieStore.set('session_access', json.access, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600, // 60 minutes in seconds
                sameSite: 'strict',
                path: '/'
            });
        } else {
            clearAuth();
        }
    } catch (error) {
        console.log('error:', error)
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