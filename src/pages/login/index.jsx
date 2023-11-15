import { StatusBar } from "expo-status-bar";
import {
  Container,
  Button,
  Logo,
  ButtonContainer,
  Input,
  ButtonText,
} from "./styles";

import { useAuth } from "../../contexts/auth";
import { Ionicons } from "@expo/vector-icons";

import logo from "../../assets/logo.png";

import { ActivityIndicator, StyleSheet } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { useState } from "react";

export function Login() {
  const { user, setUser, signIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin() {
    signIn(email, senha);
  }

  return (
    <Container>
      <Logo source={logo} />

      {loading && <ActivityIndicator size={35} color={"#fff"} />}
      {!loading && (
        <>
          <Input
            placeholder="E-mail"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Senha"
            value={senha}
            onChangeText={(text) => setSenha(text)}
            secureTextEntry={true}
          ></Input>
          <StatusBar style="auto" />
          <ButtonContainer>
            <Button onPress={handleLogin}>
              <ButtonText>ENTRAR</ButtonText>
            </Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,

    elevation: 23,
  },
});
