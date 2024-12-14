'use server';

import exp from "constants";
import { cookies } from "next/headers";

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
    (await cookies()).set('session_user', '');
    (await cookies()).set('session_access', '');
    (await cookies()).set('session_refresh', '')
}

export async function getAuth() {
    const user = (await cookies()).get('session_user')?.value //question mark makes this optional, and will return undefined if it doesn't exist

    return user ? user : null
}