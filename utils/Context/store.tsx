"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

interface ContextProps {
  User: string;
  isAuth: boolean;
  Loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<string>>;
  setisAuth: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  User: "",
  isAuth: false,
  Loading: true,
  setLoading: (): boolean => false,
  setUser: (): string => "",
  setisAuth: (): boolean => false,
});

export const GlobalContextProvider = ({ children }: any) => {
  const [User, setUser] = useState<string>("");
  const [isAuth, setisAuth] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    const Token = localStorage.getItem("Token");
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
        });
    }
    setLoading(false);
  }, []);

  return (
    <GlobalContext.Provider
      value={{ User, setUser, isAuth, setisAuth, Loading, setLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
