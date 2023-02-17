import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../prisma/client";
type Data = {
  message?: string;

  products?: any;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }
  try {
    const products = await client.product.findMany({
      select: {
        id: true,
        Title: true,
        Subtitle: true,
        Title_ku: true,
        Subtitle_ku: true,
        Title_ar: true,
        Subtitle_ar: true,
        Image: true,
      },
    });
    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
  }
}
