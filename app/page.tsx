import { cookies } from "next/headers"; // Import cookies
import { useUserStore } from "../utils/store"; // Import store
type User = {
  name: string;
  email: string;
};
type Profile = {
  user: User;
};

async function getProfile(token: string) {
  const res = await fetch("http://localhost:3000/api/auth/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let profile: Profile = await res.json();
  useUserStore.setState({ user: profile }); // Set store
  if (res.status !== 200) {
    return null;
  } else {
    return profile;
  }
}
export default async function Page() {
  let user: any = null;
  const nextCookies = cookies();
  const token = nextCookies.get("token")?.value; // Find cookie
  if (token) {
    user = await getProfile(token);
  }

  return <div> {user ? user.profile.name : "Not logged in"} </div>;
}
