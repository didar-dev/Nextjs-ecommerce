"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";
import { useRouter } from "next/navigation";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Router = useRouter();
  const SubmitLogin = async () => {
    const res = await fetch("/api/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    });
    const Data = await res.json();
    if (Data.error) {
      toast.error(Data.error);
    }
    if (Data.token) {
      setCookies("Token", Data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        httpOnly: true,
      });
      setCookies("Token", Data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        httpOnly: false,
      });

      Router.push("/");
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
          </div>
        </div>
      </div>
    </div>
  );
}
