import "./globals.css";
import Navbar from "@/components/NavBar/Navbar.jsx";
import Slides from "@/components/Header/Slides";
// async function getData() {
//   const res = await fetch("http://localhost:3000/api/Slides", {});
//   const slides = await res.json();
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return slides.Slides;
// }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const data = await getData();
  return (
    <html lang="en">
      <head />
      <body>
        <Navbar />
        {/* <Slides data={data} /> */}

        {children}
      </body>
    </html>
  );
}
