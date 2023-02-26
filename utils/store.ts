import { create } from "zustand";
type Store = {
  UserInfoJson: any;
  isAuth: boolean;
  Add: (value: string) => void;
  Auth: (value: boolean) => void;
};
export const useStore = create<Store>((set) => ({
  UserInfoJson: null,
  isAuth: false,
  AddToUserInHere: (value: string) => set({ UserInfoJson: value }),
  Add: (value: string) => set({ UserInfoJson: value }),
  Auth: (value: boolean) => set({ isAuth: value }),
}));
const SetProfile = async ({ Profile, Auth }: any) => {
  useStore.setState({ UserInfoJson: Profile, isAuth: Auth });
};

export default SetProfile;
