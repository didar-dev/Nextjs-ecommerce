"use client";
import { create } from "zustand";
type Store = {
  UserInfoJson: string;
  Add: (value: string) => void;
};
export const useStore = create<Store>((set) => ({
  UserInfoJson: "",
  Add: (value: string) => set({ UserInfoJson: value }),
}));
const initialState = {
  access:
    typeof window !== "undefined"
      ? window.localStorage.getItem("Token")
      : false,
};
export function GetToken() {
  const Token = initialState.access;
  if (Token) {
    fetch("/api/auth/profile", {
      method: "GET",
      headers: {
        Authorization: `token ${Token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === "True") {
          useStore.getState().Add(data.profile);
        }
      });
  }
}
GetToken();
