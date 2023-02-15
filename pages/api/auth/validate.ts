import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../prisma/client";

const jwt = require("jsonwebtoken");
type Data = {
  message?: string;
  user?: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { Token } = req.body;
  if (!Token) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  try {
    const isValidate = await jwt.verify(Token, process.env.JWT_SECRET);
    if (isValidate) {
      const decoded = await jwt.decode(Token);
      const user = await client.user.findUnique({
        where: {
          id: decoded.id,
        },
        select: {
          id: true,
          Email: true,
          Name: true,
          Role: true,
        },
      });
      if (!user) {
        return res.status(422).json({ message: "Token is invalid" });
      } else
        return res.status(200).json({ message: "Token is valid", user: user });
    }
  } catch (error) {
    return res.status(422).json({ message: "Token is invalid" });
  }
}
