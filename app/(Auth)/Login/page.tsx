"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useStore } from "../../../utils/store";
import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";
import { useRouter } from "next/navigation";
type res = {
  token: string;
  user: any;
};
export default function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const { Add, UserInfoJson } = useStore((state) => state);

  const Router = useRouter();
  const SubmitLogin = async () => {
    const res = await fetch("/api/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Email,
        Password,
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
      Add(Data.user);
      localStorage.setItem("Token", Data.token);
      toast.success("Login Success");
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
                onSubmit={(e) => {
                  e.preventDefault();
                  SubmitLogin();
                }}
                method="POST"
              >
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={Email}
                  placeholder="Email"
                  className="Hinput"
                  type="email"
                />
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={Password}
                  placeholder="Password"
                  className="Hinput"
                />
                <button
                  disabled={Email == "" || Password.length < 8 ? true : false}
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
