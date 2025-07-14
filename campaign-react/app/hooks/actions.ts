/*
* Cookie Actions
* 
* Stores, Gets, and Clears cookies.
*/

'use server';

import Cookies from 'js-cookie';

export function handleLogin(user: string, accessToken: string, refreshToken: string) {
    Cookies.set('session_user', user, {
        secure: process.env.NODE_ENV === 'production',
        expires: 1, // 1 day
        sameSite: 'strict',
        path: '/',
    });
    Cookies.set('session_access', accessToken, {
        secure: process.env.NODE_ENV === 'production',
        expires: 1/24, // 1 hour
        sameSite: 'strict',
        path: '/',
    });
    Cookies.set('session_refresh', refreshToken, {
        secure: process.env.NODE_ENV === 'production',
        expires: 1, // 1 day
        sameSite: 'strict',
        path: '/',
    });
}

export function logOut() {
    Cookies.remove('session_user', { path: '/' });
    Cookies.remove('session_access', { path: '/' });
    Cookies.remove('session_refresh', { path: '/' });
}

// For client-side redirect and clear cookies
export function clearAuth() {
    logOut();
    window.location.href = '/';
}

export async function updateToken() {
    const DJANGO = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
    try {
        const refreshToken = getRefreshToken();
        const accessToken = await fetch(`${DJANGO}/auth/renew/`, {
            method: 'POST',
            body: JSON.stringify({ refresh: refreshToken }),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            }
        });
        const RefreshData = await accessToken.json();
        if (RefreshData.access) {
            Cookies.set('session_access', RefreshData.access, {
                secure: process.env.NODE_ENV === 'production',
                expires: 1/24, // 1 hour
                sameSite: 'strict',
                path: '/',
            });
            return RefreshData.access;
        } else {
            clearAuth();
            return null;
        }
    } catch {
        clearAuth();
        return null;
    }
}

export function getAuth() {
    const user = Cookies.get('session_user');
    return user ? user : null;
}

export async function getAuthToken() {
    let accessToken = Cookies.get('session_access');
    const refreshToken = Cookies.get('session_refresh');
    if (!accessToken && refreshToken) {
        accessToken = await updateToken();
    }
    return accessToken ? accessToken : null;
}

export function getRefreshToken() {
    return Cookies.get('session_refresh');
}