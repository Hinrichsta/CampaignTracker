'use server';

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import CampaignJournal from "@/services/django";


const key = new TextEncoder().encode(process.env.ENCRYPT_SECRET_KEY);

type AuthResponse = { 
    id: string;
    access: string;
    refresh: string;
}


export async function encrypt(payload: any, time: string) {
    return await new SignJWT({ data: payload })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(time)
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function login(authData:AuthResponse) {
    const cookieStore = await cookies();
    const userID = await encrypt(authData.id, "1 day");
    const accessToken = await encrypt(authData.access, "1 hour");
    const refreshToken = await encrypt(authData.refresh, "1 day");

    cookieStore.set("session_id", userID, {
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

export async function logout() {
    const cookieStore = await cookies();
    // Destroy the session
    cookieStore.set("session", "", { expires: new Date(0) });
}

export async function getUserID() {
    const cookieStore = await cookies();
    const id = cookieStore.get("session_id")?.value;
    if (!id) return null;
    const data = await decrypt(id);
    return data.data
}

export async function getAccess() {
    const cookieStore = await cookies();
    const access = cookieStore.get("session_access")?.value;
    if (!access) return null;
    const data = await decrypt(access);
    return data.data
}

export async function getRefresh() {
    const cookieStore = await cookies();
    const refresh = cookieStore.get("session_refresh")?.value;
    if (!refresh) return null;
    const data = await decrypt(refresh);
    return data.data
}

export async function updateToken(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const session = request.cookies.get("session_access")?.value;
        if (session) return

        const refreshToken = await getRefresh();

        const response = await CampaignJournal.post(
            '/auth/renew/',
            JSON.stringify({ refresh: refreshToken })
        );
    
        if (response.access) {
            const res = NextResponse.next();
            const accessToken = encrypt(response.access, "1 hour")
            cookieStore.set('session_access', String(accessToken), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600, //60 minutes in seconds
                path: '/'
            });
            return res;
        } else {
            return logout();
        }
    } catch (error) {
        return logout();
    }
}