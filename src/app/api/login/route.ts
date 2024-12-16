import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { email, password } = body;


  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password: password }),
  });

  if (!response.ok) {
    return NextResponse.json(
      {
        message: "failed to login",
      },
      {
        status: response.status,
      },
    );
  }

  const data = await response.json();

  const refreshToken = data?.data?.refreshToken || null;
  const accessToken = data?.data?.accessToken || null;
  const user = data || null;
  const uuid = user?.data?.uuid || null;
  console.log(uuid)

  const cookieName = process.env?.COOKIE_REFRESH_TOKEN_NAME || "refresh_token";
  const serialized = serialize(cookieName, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return NextResponse.json(
    {
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
      uuid: uuid,
    },
    {
      status: response.status,
      headers: {
        "Set-Cookie": serialized,
      },
    },
  );
}
