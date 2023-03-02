"use client";
import React, { useRef, useState } from "react";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const router = useRouter();
  const SubmitRegister = () => {
    toast.loading("Loading...", { id: "register" });
    fetch("http://localhost:3000/api/Register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Name,
        Email,
        Password,
      }),
    }).then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          setCookie("Token", data.token);
          localStorage.setItem("Token", data.token);
          toast.success("You have been registered! 😍", { id: "register" });
          router.push("/Login");
        });
      } else {
        res.json().then((data) => {
          toast.error(data.error, { id: "register" });
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
                  SubmitRegister();
                }}
                method="POST"
              >
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={Name}
                  placeholder="Name"
                  className="Hinput"
                />
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
                  disabled={
                    Name == "" || Email == "" || Password.length < 8
                      ? true
                      : false
                  }
                  type="submit"
                  className="Hbutton"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
