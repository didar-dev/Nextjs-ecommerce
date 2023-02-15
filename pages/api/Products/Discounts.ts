import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../utils/mongodb";
type Data = {
  error?: string;
  success?: string;
  Discounts?: any;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }
  try {
    /// discountPercentage must be greater than 0
    const client = await clientPromise;
    const db = client.db("Shopping");
    const ToDB = db.collection("Products");
    const Discounts = await ToDB.find(
      { discountPercentage: { $gt: 0 } },
      {
        projection: {
          Name: 1,
          Description: 1,
          thumbnail: 1,
          Price: 1,
          Brand: 1,
          discountPercentage: 1,
          Category: 1,
          _id: 1,
        },
      }
    ).toArray();
    res.status(200).json({ success: "True", Discounts });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
