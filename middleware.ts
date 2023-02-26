import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import SetProfile from "./utils/store";
export default async function middleware(req: NextRequest) {
  const Token = req.cookies.get("Token");
  fetch("http://localhost:3000/api/me", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${Token?.value}`,
    },
    body: JSON.stringify({
      Token: `${Token?.value}`,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      SetProfile({
        Profile: {
          id: data.user.id,
          Email: data.user.Email,
          Name: data.user.Name,
          Role: data.user.Role,
        },
        Auth: true,
      });
    });
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
