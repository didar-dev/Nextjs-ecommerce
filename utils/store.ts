import { create } from "zustand";
//// create a state to save user info
export const useUserStore = create((set) => ({
  user: null,
  setUser: (user: any) => set({ user }),
}));
