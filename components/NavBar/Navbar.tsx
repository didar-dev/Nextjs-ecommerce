"use client";
import { useGlobalContext } from "../../utils/Context/store";

export default function NavBar() {
  const { User } = useGlobalContext();

  return (
    <div className="bg-gray-900 h-12 w-full md:w-3/4  grid grid-cols-3 mx-auto">
      <div className="flex  justify-between items-center h-full"></div>
      <div className="flex  justify-between items-center h-full"></div>
      <div className="flex  justify-between items-center h-full"></div>
    </div>
  );
}
