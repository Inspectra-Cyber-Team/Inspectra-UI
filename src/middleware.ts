import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  console.log("========| Middleware Running |========");
  console.log("=> Request URL: ", request.url);
  console.log("=> Request Method: ", request.method);

  const cookie = request.cookies;
  const inspectraSessionToken = cookie.get("InspectraRefreshToken");

  if (!inspectraSessionToken) {
    const redirectUrl = new URL("/login", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  const response = NextResponse.next();

  response.headers.set("X-Content-Type-Options", "nosniff");

  return response;
}

export const config = {
  matcher: ["/blog/create"],
};
