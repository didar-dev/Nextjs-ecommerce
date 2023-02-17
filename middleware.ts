import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useStore } from "./utils/store";
export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("Token");
  const Validation = await fetch("http://localhost:3000/api/auth/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Token: token?.value }),
  });
  const Body = await Validation.json();
  const Response = NextResponse.next();
  if (Validation.status === 200) {
    useStore.setState((state) => ({
      ...state,
      UserInfoJson: JSON.stringify(Body.user),
    }));
    Response.cookies.set("User", JSON.stringify(Body.user), {
      httpOnly: true,
      secure: true,
      maxAge: 3600,
      path: "/",
    });
  } else {
    useStore.setState({ UserInfoJson: "" });
  }
  return Response;
}
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
