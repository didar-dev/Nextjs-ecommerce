"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";
import { useRouter } from "next/navigation";
type res = {
  token: string;
  user: any;
};
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Router = useRouter();

  const SubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="gradient-background  md:max-w-max rounded-xl shadow-lg w-full md:max">
          <div className="bg-white rounded-xl p-5 ">
            <div>
              <form
                className="Register-form"
                onSubmit={SubmitLogin}
                method="POST"
              >
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  placeholder="Email"
                  className="Hinput"
                  type="email"
                />
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  placeholder="Password"
                  className="Hinput"
                />
                <button
                  disabled={email == "" || password.length < 8 ? true : false}
                  type="submit"
                  className="Hbutton"
                >
                  Login
                </button>
              </form>
            </div>
            <button
              onClick={() => {
                signIn("google", { callbackUrl: "http://localhost:3000" });
              }}
              className="Hbutton"
            >
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
