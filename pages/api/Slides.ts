import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../utils/mongodb";
type Data = {
  error?: string;
  success?: string;
  Slides?: any;
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
    const client = await clientPromise;
    const db = client.db("Shopping");
    const ToDB = await db.collection("Slides");
    const Slides = await ToDB.find(
      {},
      {
        projection: {},
      }
    ).toArray();
    res.status(200).json({ success: "True", Slides });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
