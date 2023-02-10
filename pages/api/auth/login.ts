// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../utils/mongodb";
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
  try {
    const client = await clientPromise;
    const db = client.db("Shopping");
    /// Find user by email
    const User = await db.collection("users").findOne({ email: email });
    if (!User) {
      return res.status(422).json({
        error: "Invalid email or password",
        success: "",
        token: "",
        user: undefined,
      });
    }
    /// Compare password
    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
      return res.status(422).json({
        error: "Invalid email or password",
        success: "",
        token: "",
        user: undefined,
      });
    }
    /// Create and assign a token
    const token = jwt.sign(
      { _id: User._id, email: User.email, name: User.name },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      error: "",
      success: "Login successful",
      token: token,
      user: User,
    });
  } catch (error) {
    console.log(error);
  }
}
