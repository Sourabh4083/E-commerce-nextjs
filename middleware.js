
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const protectedRoutes = ["/checkout", "/profile", "/orders"]
const adminRoutes = ["/admin", "/admin/dashboard", "/admin/manage-products", "/admin/view-orders"]

export async function middleware(request) {

  const { pathname } = request.nextUrl
  const token = request.cookies.get("token")?.value;

  if (![...protectedRoutes, ...adminRoutes].some(route => pathname.startsWith(route))) {
    return NextResponse.next()
    
  }


  if (!token) {
    
    const loginUrl = new URL(`/login?redirect=${pathname}`, request.url)
    return NextResponse.redirect(loginUrl)
    
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))

    if (adminRoutes.some(route => pathname.startsWith(route))) {
      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url))
      }
    }
    return NextResponse.next();
  } catch (err) {
    const loginUrl = new URL(`/login?redirect=${pathname}`, request.url)
    return NextResponse.redirect(loginUrl)
    
  }
}

export const config = {
  matcher: ["/checkout", "/profile", "/orders","/admin/:path","/my-orders"],
};
