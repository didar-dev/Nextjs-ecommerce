import { NextResponse } from "next/server";
import client from "../../../prisma/client";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export async function POST(request: Request) {
  const { Email, Password } = await request.json();
  if (!Email || !Password) {
    return NextResponse.json({
      message: "Please enter all fields",
    });
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
    return NextResponse.json({
      message: "User does not exist",
    });
  }
  const isMatch = await bcrypt.compare(Password, user.Password);
  if (!isMatch) {
    return NextResponse.json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    { id: user.id, Email: user.Email, Name: user.Name, Role: user.Role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return NextResponse.json({
    token,
    user: {
      id: user.id,
      Email: user.Email,
      Name: user.Name,
      Role: user.Role,
    },
  });
}
