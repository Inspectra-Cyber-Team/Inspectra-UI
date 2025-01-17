import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh";
  const cookieStore = cookies();
  const credential = cookieStore.get(cookieName);

  if (!credential) {
    return NextResponse.json(
      {
        message: "Token not found",
      },
      {
        status: 400,
      },
    );
  }

  const refreshToken = credential.value;

  if (refreshToken) {
    cookieStore.delete(cookieName);

    return NextResponse.json(
      {
        message: "Logout successful",
      },
      {
        status: 200,
      },
    );
  }

  return NextResponse.json(
    {
      message: "Failed to logout.tsx",
    },
    {
      status: 400,
    },
  );
}
