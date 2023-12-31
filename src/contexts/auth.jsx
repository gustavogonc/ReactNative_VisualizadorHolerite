import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { api } from "../lib/axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [nome, setNome] = useState("");

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem("@Auth:user");
      const storagedId = await AsyncStorage.getItem("@Auth:id");
      const storagedName = await AsyncStorage.getItem("@Auth:name");

      if (storagedUser && storagedId) {
        console.log(storagedId + " " + storagedUser);
        setUser(JSON.parse(storagedUser));
        setId(JSON.parse(storagedId));
        setNome(JSON.parse(storagedName));
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

    console.log(response.data);
    setUser(response?.data[0]?.email_usuario);
    setId(response?.data[0]?.id_funcionario);
    setNome(response?.data[0]?.nome_funcionario);

    await AsyncStorage.setItem(
      "@Auth:user",
      JSON.stringify(response?.data[0]?.email_usuario)
    );

    await AsyncStorage.setItem(
      "@Auth:id",
      JSON.stringify(response?.data[0]?.id_funcionario)
    );

    await AsyncStorage.setItem(
      "@Auth:name",
      JSON.stringify(response?.data[0]?.nome_funcionario)
    );
    return response;
  }

  async function signOut() {
    AsyncStorage.clear().then(() => {
      setUser("");
      setId("");
      setNome("");
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: true,
        user,
        setUser,
        signIn,
        signOut,
        loading,
        id,
        message,
        setMessage,
        nome,
      }}
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
