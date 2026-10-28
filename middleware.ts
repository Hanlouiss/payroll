import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value);
  const redirectTo = (path: string) => NextResponse.redirect(new URL(path, req.url));

  if (!session) {
    return pathname === "/login" ? NextResponse.next() : redirectTo("/login");
  }

  const home = session.role === "1" ? "/" : "/karyawan";
  if (pathname === "/login") return redirectTo(home);
  if (session.role === "2" && !pathname.startsWith("/karyawan")) return redirectTo("/karyawan");
  if (session.role === "1" && pathname.startsWith("/karyawan")) return redirectTo("/");

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
