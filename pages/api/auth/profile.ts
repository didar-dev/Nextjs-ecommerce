import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/mongoConnect";
import User from "../../../models/User";
const bcrypt = require("bcryptjs");
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
  if (!Token) {
    return res.status(422).json({
      error: "Invalid token",
      success: "",
      token: "",
      profile: undefined,
    });
  }
  let existingUser: any;
  await connectDB()
    .then(async () => {
      try {
        existingUser = await User.findOne({ _id: Token.id });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: "Something went wrong",
          success: "",
          token: "",
          profile: undefined,
        });
      }
      if (!existingUser) {
        res.status(422).json({
          error: "User does not exist",
          success: "",
          token: "",
          profile: undefined,
        });
      }
      res.status(200).json({
        error: "",
        success: "User found",
        token: "",
        profile: existingUser,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Something went wrong",
        success: "",
        token: "",
        profile: undefined,
      });
    });
}
