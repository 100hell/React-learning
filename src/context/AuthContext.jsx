import React, { createContext, useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const toast = useToast();
  const [user, setUser] = useState(null);
  const [authType, setAuthType] = useState("signup");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, authType, setAuthType }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
