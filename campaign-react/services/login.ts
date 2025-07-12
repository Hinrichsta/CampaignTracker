import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { user, accessToken, refreshToken } = await req.json();

    if (!user || !accessToken || !refreshToken) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const res = NextResponse.json({ success: true });

    // Set secure, HttpOnly cookies
    res.cookies.set('session_user', user, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400, // 1 day
      sameSite: 'strict',
      path: '/',
    });

    res.cookies.set('session_access', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600, // 1 hour
      sameSite: 'strict',
      path: '/',
    });

    res.cookies.set('session_refresh', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400,
      sameSite: 'strict',
      path: '/',
    });

    return res;

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
