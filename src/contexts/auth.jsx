import { createContext, useState } from "react";
import { useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState();

  return (
    <AuthContext.Provider value={{ signed: true, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
