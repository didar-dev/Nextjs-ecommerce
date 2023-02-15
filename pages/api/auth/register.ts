import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../prisma/client";
const bcrypt = require("bcryptjs");
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
  const { Name, Email, Password } = req.body;
  if (!Name || !Email || !Password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }
  const user = await client.user.findUnique({
    where: {
      Email,
    },
  });
  if (user) {
    return res
      .status(400)
      .json({ error: "User already exists with this email" });
  }
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(Email)) {
    return res.status(400).json({ error: "Please enter a valid email" });
  }
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(Password)) {
    return res.status(400).json({
      error: "Password not strong enough",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(Password, salt);
  client.user
    .create({
      data: {
        Name,
        Email,
        Password: hash,
      },
    })
    .catch((error: any) => {
      return res.status(500).json({ error: "Something went wrong" });
    });
  return res.status(200).json({ success: "User created" });
}
