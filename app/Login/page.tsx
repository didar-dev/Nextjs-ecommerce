"use client";
import React, { useRef } from "react";
import { setCookie, getCookie } from "cookies-next";
type res = {
  token: string;
};
export default function Login() {
  const email = useRef("");
  const password = useRef("");
  async function onSubmit() {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.current,
        password: password.current,
      }),
    });
    if (res.ok) {
      setCookie("token", await res.json().then((res: res) => res.token));
    } else {
      alert("Login failed");
    }
  }

  return (
    <div className="bg-red-100 flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-sm">
            <h2>Login</h2>
            <form name="form" method="post" onSubmit={() => onSubmit()}>
              <div className="flex flex-col gap-2 justify-center">
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) => (email.current = e.target.value)}
                  type="text"
                  className="bg-gray-200"
                  name="email"
                />
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  onChange={(e) => (password.current = e.target.value)}
                  className="bg-gray-200"
                  name="password"
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
