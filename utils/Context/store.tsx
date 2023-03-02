"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
const { getCookie, setCookie } = require("cookies-next");
import { Toaster } from "react-hot-toast";

type User = {
  id: string;
  Name: string;
  Email: string;
  Role: string;
};

interface ContextProps {
  User: User;
  isAuth: boolean;
  Loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<object>>;
  setisAuth: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  User: {
    id: "",
    Name: "",
    Email: "",
    Role: "",
  },
  isAuth: false,
  Loading: true,
  setLoading: (): boolean => false,
  setUser: (): object => ({
    Name: "",
    Email: "",
    Password: "",
    Token: "",
  }),
  setisAuth: (): boolean => false,
});

export const GlobalContextProvider = ({ children }: any) => {
  const [User, setUser] = useState<object>({});
  const [isAuth, setisAuth] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);

    const Token = getCookie("Token");
    if (Token) {
      fetch("http://localhost:3000/api/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${Token}`,
        },
        body: JSON.stringify({
          Token: `${Token}`,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data.user);
          setisAuth(true);
          localStorage.setItem("User", JSON.stringify(data.user));
        });
    }
    setLoading(false);
  }, []);

  return (
    <GlobalContext.Provider
      value={
        {
          User,
          setUser,
          isAuth,
          setisAuth,
          Loading,
          setLoading,
        } as ContextProps
      }
    >
      <Toaster />
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
