import "./globals.css";
import Navbar from "@/components/NavBar/Navbar";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Navbar />
        <div className="md:w-5/6 flex flex-col items-center justify-center mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
