import type { NextApiRequest, NextApiResponse } from "next";
import client from "../.././prisma/client";
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
    const Slides = await client.slide.findMany({
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
      success: "Slides fetched successfully",
      Slides,
    });
  } catch (error) {
    console.log(error);
  }
}
