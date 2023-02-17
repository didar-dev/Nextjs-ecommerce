import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../prisma/client";
type Data = {
  message?: string;
  Discounts?: any;
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
  const { Percentage, Quantity } = req.query;
  try {
    const Discounts = await client.product.findMany({
      select: {
        id: true,
        Name: true,
        Description: true,
        Price: true,
        Thumbnail: true,
        Images: true,
        Stock: true,
        Category: true,
      },
      where: {
        Discount: {
          gte: Number(Percentage) ? Number(Percentage) : 0,
        },
      },
      take: Quantity ? Number(Quantity) : 10,
    });
    res.status(200).json({
      message: "Products fetched successfully",
      Discounts,
    });
  } catch (error) {
    console.log(error);
  }
}
