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

import { StyleSheet } from "react-native";
import { Shadow } from "react-native-shadow-2";

export function Login() {
  const { user, setUser } = useAuth();

  function handleLogin() {
    setUser("teste");
  }
  return (
    <Container>
      <Logo source={logo} />

      <Input placeholder="E-mail" />
      <Input placeholder="Senha" secureTextEntry={true}></Input>

      <StatusBar style="auto" />

      <ButtonContainer>
        <Button onPress={handleLogin}>
          <ButtonText>ENTRAR</ButtonText>
        </Button>
      </ButtonContainer>
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
