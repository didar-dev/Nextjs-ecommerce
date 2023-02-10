import { cookies } from "next/headers"; // Import cookies
import { useUserStore } from "../utils/store"; // Import store
type User = {
  name: string;
  email: string;
};
type Respon = {
  user: User;
  Profile: any;
};

async function getProfile(token: string) {
  const res = await fetch("http://localhost:3000/api/auth/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let respon: Respon = await res.json();
  if (res.status !== 200) {
    return null;
  } else {
    return respon.Profile;
  }
}
export default async function Page() {
  const nextCookies = cookies();
  const token = nextCookies.get("token")?.value;
  if (token) {
    getProfile(token).then((profile) => {
      console.log(profile);
    });
  } else {
    console.log("No token");
  }

  return <div></div>;
}
