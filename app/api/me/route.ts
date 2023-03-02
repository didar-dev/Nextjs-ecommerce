import { NextResponse } from "next/server";
import client from "../../../prisma/client";
const jwt = require("jsonwebtoken");

export async function POST(request: Request) {
  /// get Token from request header Authorization
  const { Token } = await request.json();
  if (!Token) {
    return NextResponse.json({
      message: "Please enter all fields",
    });
  }
  const verified = jwt.verify(Token, process.env.JWT_SECRET);
  if (!verified) {
    return NextResponse.json({
      message: "Invalid Token",
    });
  }
  const user = await client.user.findUnique({
    where: {
      Email: verified.Email,
    },
    select: {
      id: true,
      Email: true,
      Name: true,
      Role: true,
    },
  });
  if (!user) {
    return NextResponse.json({
      message: "User does not exist",
    });
  }
  return NextResponse.json({
    user: {
      id: user.id,
      Email: user.Email,
      Name: user.Name,
      Role: user.Role,
    },
  });
}
