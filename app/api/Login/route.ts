import client from "../../../prisma/client";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

interface req {
  body: {
    Email: string;
    Password: string;
  };
}

export async function POST(req: req) {
  const { Email, Password } = req.body;
  console.log(req.body.Email);
  if (!Email || !Password) {
    return new Response(
      JSON.stringify({
        message: "Please enter all fields",
      }),
      {
        status: 300,
      }
    );
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
    return new Response(
      JSON.stringify({
        message: "User does not exist",
      }),
      {
        status: 404,
      }
    );
  }
  const isMatch = await bcrypt.compare(Password, user.Password);
  if (!isMatch) {
    return new Response(
      JSON.stringify({
        message: "Invalid credentials",
      }),
      {
        status: 200,
      }
    );
  }
  const token = jwt.sign(
    { id: user.id, Email: user.Email, Name: user.Name, Role: user.Role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return new Response(
    JSON.stringify({
      token,
      user: {
        id: user.id,
        Email: user.Email,
        Name: user.Name,
        Role: user.Role,
      },
    }),
    {
      status: 200,
    }
  );
}
