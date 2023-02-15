"use client";
import React, { useRef, useState } from "react";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
type res = {
  token: string;
};
export default function Register() {
  const router = useRouter();
  const Name = useRef("");
  const Email = useRef("");
  const Password = useRef("");
  const RepeatPassword = useRef("");
  const SubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading("Loading...", { duration: 5000, id: "register" });
    fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Name: Name.current,
        Email: Email.current,
        Password: Password.current,
      }),
    }).then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          setCookie("Token", data.token);
          toast.success("You have been registered! 😍", { id: "register" });
          router.push("/");
        });
      } else {
        res.json().then((data) => {
          toast.error(data.error, { id: "register" });
        });
      }
    });
  };

  return (
    <div className="bg-gray-700 flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl">
            <h2 className="text-2xl pb-2 font-bold">Register</h2>
            <form name="form" method="post" onSubmit={SubmitRegister}>
              <div className="flex mb-2 flex-col gap-3 justify-center">
                <input
                  onChange={(e) => (Name.current = e.target.value)}
                  type="text"
                  className="bg-gray-200 border p-2 -w-4xl border-gray-300 rounded-md focus:outline-none focus:border-transparent"
                  name="Name"
                  placeholder="Name"
                />
                <input
                  onChange={(e) => (Email.current = e.target.value)}
                  type="email"
                  className="bg-gray-200 border p-2  -w-4xl border-gray-300 rounded-md focus:outline-none focus:border-transparent"
                  name="Email"
                  placeholder="Email Address"
                />
                <input
                  onChange={(e) => (Password.current = e.target.value)}
                  type="password"
                  className="bg-gray-200 border p-2  -w-4xl border-gray-300 rounded-md focus:outline-none focus:border-transparent"
                  name="Password"
                  placeholder="Password"
                />
                <input
                  onChange={(e) => (RepeatPassword.current = e.target.value)}
                  type="password"
                  className="bg-gray-200 border p-2  -w-4xl border-gray-300 rounded-md focus:outline-none focus:border-transparent"
                  name="RepeatPassword"
                  placeholder="Repeat Password"
                />
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <button type="submit" className="bg-blue-500 text-white">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
