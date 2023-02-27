import { NextResponse } from "next/server";

import client from "../../../prisma/client";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export async function POST(request: Request) {
  const { Email, Password, Name } = await request.json();
  if (!Email || !Password || !Name) {
    return NextResponse.json({
      message: "Please enter all fields",
    });
  }

  const user = await client.user.findUnique({
    where: {
      Email,
    },
  });

  if (user) {
    return NextResponse.json({
      message: "User already exists",
    });
  }

  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(Password, salt);
  const newUser = await client.user.create({
    data: {
      Email,
      Password: hash,
      Name,
    },
  });

  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });

  return NextResponse.json({
    token,
    user: {
      id: newUser.id,
      Name: newUser.Name,
      Email: newUser.Email,
    },
  });
}
