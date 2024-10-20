import { createContext, useState, useEffect } from "react";

export let userContext = createContext();

export default function UserContextProvider(props) {
  const [isLogin, setLogin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <userContext.Provider value={{ isLogin, setLogin }}>
      {props.children}
    </userContext.Provider>
  );
}
