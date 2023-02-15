import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../prisma/client";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
type Data = {
  error?: string;
  success?: string;
  token?: string;
  user?: any;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  const user = await client.user.findUnique({
    where: {
      Email,
    },
    select: {
      id: true,
      Email: true,
      Name: true,
      Role: true,
      Password: true,
    },
  });
  if (!user) {
    return res.status(422).json({
      error: "Invalid Email or Password",
    });
  }
  /// check password
  const isMatch = await bcrypt.compare(Password, user.Password);
  if (!isMatch) {
    return res.status(422).json({
      error: "Invalid Email or Password",
    });
  }

  const token = jwt.sign(
    { id: user.id, Email: user.Email, Name: user.Name, Role: user.Role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  res.status(200).json({
    success: "Login Success",
    token,
    user,
  });
}
