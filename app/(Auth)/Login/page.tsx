"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { setCookie } from "cookies-next";
type res = {
  token: string;
};
export default function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const SubmitLogin = () => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Email,
        Password,
      }),
    }).then((res) => {
      if (res.status == 200) {
        res.json().then((data: res) => {
          setCookie("Token", data.token);
          toast.success("You have been logged in! 😍");
        });
      } else {
        res.json().then((data) => {
          toast.error(data.error);
        });
      }
    });
  };
  return (
    <div
      style={{
        backgroundImage: `url("https://free4kwallpapers.com/uploads/originals/2015/07/18/deep-blue-background.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "#000000",
      }}
      className="flex flex-col items-center justify-center"
    >
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
