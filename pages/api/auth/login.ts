// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/mongoConnect";
import User from "../../../models/User";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

type Data = {
  error: string;
  success: string;
  token: string;
  user: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
      success: "",
      token: "",
      user: undefined,
    });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      error: "Please add all the fields",
      success: "",
      token: "",
      user: undefined,
    });
  }
  let existingUser: any;
  await connectDB()
    .then(async () => {
      try {
        existingUser = await User.findOne({ email: email });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: "Something went wrong",
          success: "",
          token: "",
          user: undefined,
        });
      }
      if (!existingUser) {
        res.status(422).json({
          error: "User does not exist",
          success: "",
          token: "",
          user: undefined,
        });
      }
      let isValidPassword = false;
      try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: "Something went wrong",
          success: "",
          token: "",
          user: undefined,
        });
      }
      if (!isValidPassword) {
        res.status(422).json({
          error: "Invalid credentials",
          success: "",
          token: "",
          user: undefined,
        });
      }
      const token = jwt.sign(
        {
          id: existingUser._id,
          email: existingUser.email,
          name: existingUser.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      const Profile = {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      };
      res.status(200).json({
        success: "User logged in",
        token: token,
        error: "",
        user: Profile,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
