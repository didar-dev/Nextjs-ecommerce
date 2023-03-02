"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useGlobalContext } from "../.././../utils/Context/store";
import { useRouter } from "next/navigation";
export default function Login() {
  const { User } = useGlobalContext();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const SubmitLogin = async (e: any) => {
    e.preventDefault();
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
      localStorage.setItem("Token", Data.token);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      {User ? ( // If user is logged in
        <p className="text-2xl font-bold">You are logged in</p>
      ) : (
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
                    disabled={Email.length < 1 || Password.length < 1}
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
      )}
    </div>
  );
}
