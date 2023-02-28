import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data } = useSession();
  console.log(data);
  return (
    <div className="bg-gray-900 h-12 w-full md:w-3/4  grid grid-cols-3 mx-auto">
      <div className="flex  justify-between items-center h-full"></div>
      <div className="flex  justify-between items-center h-full"></div>
      <div className="flex  justify-between items-center h-full"></div>
    </div>
  );
}
