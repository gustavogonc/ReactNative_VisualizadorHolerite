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

import logo from "../../assets/logo.png";

export function Login() {
  const { user, setUser } = useAuth();

  function handleLogin() {
    setUser("teste");
  }
  return (
    <Container>
      <Logo source={logo} />

      <Input placeholder="E-mail" />
      <Input placeholder="Senha" />

      <StatusBar style="auto" />

      <ButtonContainer>
        <Button onPress={handleLogin}>
          <ButtonText>ENTRAR</ButtonText>
        </Button>
      </ButtonContainer>
    </Container>
  );
}
