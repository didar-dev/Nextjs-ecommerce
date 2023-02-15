"use client";
import React, { useRef } from "react";
import { setCookie, getCookie } from "cookies-next";
type res = {
  token: string;
};
export default function Register() {
  const Name = useRef("");
  const Email = useRef("");
  const Password = useRef("");
  const RepeatPassword = useRef("");
  async function onSubmit() {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: Email.current,
        password: Password.current,
      }),
    });
  }
  return (
    <div className="bg-gray-700 flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl">
            <h2 className="text-2xl pb-2 font-bold">Register</h2>
            <form name="form" method="post" onSubmit={() => onSubmit()}>
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
