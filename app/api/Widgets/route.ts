import { NextRequest, NextResponse } from "next/server";
import client from "../../../prisma/client";
export async function GET(request: NextRequest) {
  const widget = await client.widget.findMany({});
  return NextResponse.json(widget);
}
