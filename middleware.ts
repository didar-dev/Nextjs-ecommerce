import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useStore } from "./utils/store";
export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("Token");
  try {
    const Validation = await fetch("http://localhost:3000/api/auth/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Token: token?.value }),
    });
    const Body = await Validation.json();
    const Response = NextResponse.next();
    Response.cookies.set("User", JSON.stringify(Body.user), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });
    return Response;
  } catch (error) {}
}
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
