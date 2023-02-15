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
