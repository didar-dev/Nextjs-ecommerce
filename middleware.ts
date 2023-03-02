import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export default async function middleware(
  request: NextRequest,
  response: NextResponse
) {}
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
