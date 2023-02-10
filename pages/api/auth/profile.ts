import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../utils/mongodb";

const jwt = require("jsonwebtoken");
type Data = {
  error: string;
  success: string;
  token: string;
  profile: any;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed",
      success: "",
      token: "",
      profile: undefined,
    });
  }
  let token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(422).json({
      error: "Please add all the fields",
      success: "",
      token: "",
      profile: undefined,
    });
  }
  /// verify token and get user
  const Token = jwt.verify(token, process.env.JWT_SECRET);
  const client = await clientPromise;
  const db = client.db("Shopping");
  const User = await db
    .collection("users")
    .findOne({ email: Token.email }, { projection: { name: 1, email: 1 } });
  if (!User) {
    return res.status(422).json({
      error: "No user found",
      success: "",
      token: "",
      profile: undefined,
    });
  }
  return res.status(200).json({
    error: "",
    success: "User logged in successfully",
    token: token,
    profile: User,
  });
}
