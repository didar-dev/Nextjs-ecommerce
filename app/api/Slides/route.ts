import { NextRequest, NextResponse } from "next/server";
import client from "../../../prisma/client";
export async function GET(request: NextRequest) {
  const Slides = await client.slide.findMany({});
  return NextResponse.json(Slides);
}
