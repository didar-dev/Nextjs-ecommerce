"use client";
import "./globals.css";
import Navbar from "../components/NavBar/Navbar";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="min-h-screen bg-[#e3e6e6]">
          <SessionProvider>
            <Navbar />
            <div className="md:w-5/6  flex flex-col items-center justify-center mx-auto">
              {children}
            </div>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
