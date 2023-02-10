import "./globals.css";
import Navbar from "@/components/NavBar/Navbar.jsx";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Navbar />

        {children}
      </body>
    </html>
  );
}
