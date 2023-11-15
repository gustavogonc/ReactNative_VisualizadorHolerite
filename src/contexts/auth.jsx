import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { api } from "../lib/axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem("@Auth:user");
      const storagedId = await AsyncStorage.getItem("@Auth:id");

      if (storagedUser && storagedId) {
        setUser(JSON.parse(storagedUser));
        setId(JSON.parse(storagedId));
        setLoading(false);
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  async function signIn(email, senha) {
    const data = {
      email,
      senha,
    };

    const response = await api.post("App/loginApp", data);
    try {
      if (response.status == 200) {
        console.log(response.data);
        setUser(response?.data[0]?.email_usuario);
        setId(response?.data[0]?.id_funcionario);

        await AsyncStorage.setItem(
          "@Auth:user",
          JSON.stringify(response?.data[0]?.email_usuario)
        );

        await AsyncStorage.setItem(
          "@Auth:id",
          JSON.stringify(response?.data[0]?.id_funcionario)
        );
      }
    } catch (error) {
      console.log("erro ao autenticar" + error);
    }
  }

  async function signOut() {
    AsyncStorage.clear().then(() => {
      setUser("");
      setId("");
    });
  }

  return (
    <AuthContext.Provider
      value={{ signed: true, user, setUser, signIn, signOut, loading, id }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
