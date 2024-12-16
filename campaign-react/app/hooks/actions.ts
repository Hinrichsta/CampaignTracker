'use server';

import { request } from "http";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export async function handleLogin(user:string, accessToken:string, refreshToken:string) {
    const cookieStore = await cookies();
    cookieStore.set('session_user', user, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400, //One day in seconds
        sameSite: 'strict',
        path: '/'
    });

    cookieStore.set('session_access', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600, //60 minutes in seconds
        path: '/'
    });

    cookieStore.set('session_refresh', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400, //One day in seconds
        sameSite: 'strict',
        path: '/'
    });
}

export async function logOut() {
    const cookieStore = await cookies();
    cookieStore.delete('session_user');
    cookieStore.delete('session_access');
    cookieStore.delete('session_refresh');
}

export async function clearAuth(response:string) {
    const url = new URL('/', response)
    const redirect = NextResponse.redirect(url);
    redirect.cookies.delete('session_user');
    redirect.cookies.delete('session_access');
    redirect.cookies.delete('session_refresh');

    return redirect;
}

export async function updateToken(response:string) {
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
    
        const RefreshData = await accessToken.json()
    
        if (RefreshData.access) {
            const response = NextResponse.next();
            const cookieStore = await cookies();
            cookieStore.set('session_access', RefreshData.access, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600, // 60 minutes in seconds
                sameSite: 'strict',
                path: '/'
            });
            return response;
        } else {
            return clearAuth(response);
        }
    } catch (error) {
        console.log(error)
        return clearAuth(response);
    }
}

export async function getAuth() {
    const cookieStore = await cookies();
    const user = cookieStore.get('session_user')?.value; //question mark makes this optional, and will return undefined if it doesn't exist
    
    return user ? user : null;
}

export async function getAuthToken(response:string) {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get('session_access')?.value;
    let refreshToken = cookieStore.get('session_refresh')?.value;

    if (!accessToken && refreshToken){
        const update = await updateToken(response);

        if (update.cookies.get('session_access')) {
            accessToken = update.cookies.get('session_access')?.value;
        }
    }
    return accessToken ? accessToken : null;
}

export async function getRefreshToken() {
    const cookieStore = await cookies();
    let refreshToken = cookieStore.get('session_refresh')?.value;

    return refreshToken;
}