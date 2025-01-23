import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Define restricted paths
  const restrictedPaths = ["/sell", "/account","/wallet","/dashboard","/favourites","/invoices","/mybid","/Mylisting","userDashboard"];

  // Check if the request URL is restricted
  const isRestricted = restrictedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isRestricted && !token) {
    // Redirect unauthenticated users to the homepage
    const loginUrl = new URL("/", req.url);
    loginUrl.searchParams.set("login", "true"); // Optional query param to trigger a login modal
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
