import { NextRequest, NextResponse } from "next/server";
import client from "../../../../prisma/client";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const Percentage = searchParams.get("Percentage");
  const Quantity = searchParams.get("Quantity");
  const products = await client.product.findMany({
    select: {
      id: true,
      Name: true,
      Name_ku: true,
      Name_ar: true,
      Description: true,
      Description_ku: true,
      Description_ar: true,
      Price: true,
      Discount: true,
      Thumbnail: true,
      Images: true,
      Stock: true,
      Category: true,
    },
  });

  return NextResponse.json({
    products: products,
  });
}
