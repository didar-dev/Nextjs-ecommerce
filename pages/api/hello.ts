// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../utils/mongodb";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  connectDB()
    .then(() => {
      console.log("connected to db");
      res.status(200).json({ name: "Connected to db" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ name: "Error connecting to db" });
    });
}
