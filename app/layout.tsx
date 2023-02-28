import "./globals.css";
import Navbar from "@/components/NavBar/Navbar";
import { GlobalContextProvider } from "../utils/Context/store";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="min-h-screen bg-[#e3e6e6]">
          <GlobalContextProvider>
            <Navbar />
            <div className="md:w-5/6  flex flex-col items-center justify-center mx-auto">
              {children}
            </div>
          </GlobalContextProvider>
        </div>
      </body>
    </html>
  );
}
