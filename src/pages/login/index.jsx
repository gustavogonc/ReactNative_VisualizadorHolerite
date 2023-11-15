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
import { MessageComponent } from "../../components/MessageComponent";

import logo from "../../assets/logo.png";

import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { useState } from "react";

export function Login() {
  const { user, setUser, signIn, loading, message, setMessage } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin() {
    setMessage("");
    if (senha == "" || email == "") {
      setMessage("Os campos são obrigatórios!");
      return;
    }
    try {
      const response = await signIn(email, senha);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage("Usuário ou senha inválidos");
      } else {
        setMessage("Erro no login: " + error.message);
      }
    }
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
          {message != "" && (
            <MessageComponent message={message} type={"error"} />
          )}
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
