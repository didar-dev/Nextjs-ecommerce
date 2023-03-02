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
interface ContextProps {
  User: object;
  isAuth: boolean;
  Loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<object>>;
  setisAuth: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  User: {},
  isAuth: false,
  Loading: true,
  setLoading: (): boolean => false,
  setUser: (): object => ({}),
  setisAuth: (): boolean => false,
});

export const GlobalContextProvider = ({ children }: any) => {
  const Usere = localStorage.getItem("User");
  const [User, setUser] = useState<object>(Usere ? JSON.parse(Usere) : {});
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
      value={{
        User,
        setUser,
        isAuth,
        setisAuth,
        Loading,
        setLoading,
      }}
    >
      <Toaster />
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
