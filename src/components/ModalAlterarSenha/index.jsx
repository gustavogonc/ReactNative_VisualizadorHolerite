import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";

import {
  Container,
  PasswordInput,
  Content,
  Title,
  ButtonArea,
  ButtonBack,
  Button,
  InputSenha,
  TitleButton,
  LabelSenha,
} from "./styles";

export function AlterarSenha({ handleClose }) {
  return (
    <Container>
      <Content>
        <Title>Alterar Senha</Title>

        <PasswordInput>
          <LabelSenha>Senha atual</LabelSenha>
          <InputSenha />
        </PasswordInput>

        <PasswordInput>
          <LabelSenha>Nova senha</LabelSenha>
          <InputSenha />
        </PasswordInput>

        <PasswordInput>
          <LabelSenha>Confirmar senha</LabelSenha>
          <InputSenha />
        </PasswordInput>

        <ButtonArea>
          <ButtonBack onPress={handleClose}>
            <TitleButton>Voltar</TitleButton>
          </ButtonBack>

          <Button>
            <TitleButton>Confirmar</TitleButton>
          </Button>
        </ButtonArea>
      </Content>
    </Container>
  );
}
