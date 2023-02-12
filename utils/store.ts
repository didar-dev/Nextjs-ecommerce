"use client";
import { create } from "zustand";
type Store = {
  UserInfoJson: string;
  Add: (value: string) => void;
};

export const useStore = create<Store>((set) => ({
  UserInfoJson: "false",
  Add: (value: string) => set({ UserInfoJson: value }),
}));

/// gt the Token on local storage
export function GetToken() {
  const Token = localStorage.getItem("token");
  if (Token) {
    fetch("/api/auth/profile", {
      method: "GET",
      headers: {
        Authorization: `token ${Token}`,
      },
    })
      /// if resons data success is true
      .then((res) => res.json())
      .then((data) => {
        if (data.success === "True") {
          useStore.getState().Add(data.profile);
        }
      });
  }
}
GetToken();
