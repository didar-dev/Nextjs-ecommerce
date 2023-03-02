import client from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const products = await client.product.findMany({
      where: {
        Category: {
          Name: searchParams.get("category") || undefined,
        },
        Brand: {
          Name: searchParams.get("brand") || undefined,
        },
      },
    });
    return NextResponse.json({
      products: products,
    });
  } catch (error) {
    console.log(error);
  }
}
