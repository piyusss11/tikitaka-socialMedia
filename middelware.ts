import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const { pathname } = req.nextUrl;
        // allow auth-related routes
        if (
          pathname.startsWith("/api/v1/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }
        // public routes
        if (pathname === "/" || pathname.startsWith("/api/v1/videos")) {
          return true;
        }
        // all other requires authentication
        return !!token;
      },
    },
  }
);
export const config = {
  match: [
    //  * Match all request paths except:
    //  * - _next/static (static files)
    //  * - _next/image (image optimization files)
    //  * - favicon.ico (favicon file)
    //  * - public folder

    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
