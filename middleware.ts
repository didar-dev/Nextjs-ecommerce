import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useStore } from "./utils/store";

export function middleware(req: NextRequest) {
  const Token = req.cookies.get("Token");
  //   if (Token) {
  //     fetch("http://localhost:3000/api/auth/profile", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `token ${Token?.value}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.success === "True") {
  //           useStore.getState().Add(data.profile);
  //         }
  //       });
  //   }
  return NextResponse.next();
}
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
