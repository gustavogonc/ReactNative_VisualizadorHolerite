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

import { api } from "../../lib/axios";
import { useState } from "react";
import { useAuth } from "../../contexts/auth";
import { MessageComponent } from "../MessageComponent";

import { ActivityIndicator, Text } from "react-native";

export function AlterarSenha({ handleClose }) {
  const { setMessage, message, user, signOut } = useAuth();

  const [senhaAtual, setSenhaAtual] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [confirmaSenhaNova, setConfirmaSenhaNova] = useState("");
  const [loadingAlteracao, setLoadingAlteracao] = useState(false);
  const [successfullMessage, setSuccessfullMessage] = useState(false);

  async function changePassword() {
    setLoadingAlteracao(true);
    setMessage("");
    if (senhaAtual == "" || senhaNova == "" || confirmaSenhaNova == "") {
      setMessage("Todos os campos são obrigatórios!");
      setLoadingAlteracao(false);
      return;
    } else if (senhaNova != confirmaSenhaNova) {
      setMessage("Senha nova e confirmação não estão iguais!");
      setLoadingAlteracao(false);
      return;
    }

    atualizacaoSenha = {
      email: user,
      senha: senhaAtual,
      novaSenha: senhaNova,
    };

    try {
      const response = await api.put("App/atualizaSenha", atualizacaoSenha);
      if (response.status == 200) {
        setSuccessfullMessage(
          "Senha atualizada com sucesso, entre no aplicativo com sua nova senha"
        );
        setTimeout(() => {
          signOut();
        }, 5000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage("Senha atual incorreta!");
      } else {
        setMessage("Erro inesperado ao atualizar senha, tente novamente!");
      }
    } finally {
      setLoadingAlteracao(false);
    }
  }

  const closeModal = () => {
    setMessage("");
    handleClose();
  };

  return (
    <Container>
      <Content>
        <Title>Alterar Senha</Title>

        {successfullMessage != "" ? (
          <>
            <Text>{successfullMessage}</Text>
            <ActivityIndicator size={36} color={"#282a2c"} />
          </>
        ) : (
          <>
            <PasswordInput>
              <LabelSenha>Senha atual</LabelSenha>
              <InputSenha
                onChangeText={(text) => setSenhaAtual(text)}
                value={senhaAtual}
              />
            </PasswordInput>

            <PasswordInput>
              <LabelSenha>Nova senha</LabelSenha>
              <InputSenha
                onChangeText={(text) => setSenhaNova(text)}
                value={senhaNova}
              />
            </PasswordInput>

            <PasswordInput>
              <LabelSenha>Confirmar senha</LabelSenha>
              <InputSenha
                onChangeText={(text) => setConfirmaSenhaNova(text)}
                value={confirmaSenhaNova}
              />
            </PasswordInput>

            <ButtonArea>
              <ButtonBack onPress={closeModal}>
                <TitleButton>Voltar</TitleButton>
              </ButtonBack>

              <Button onPress={changePassword}>
                {loadingAlteracao ? (
                  <ActivityIndicator />
                ) : (
                  <TitleButton>Confirmar</TitleButton>
                )}
              </Button>
            </ButtonArea>
            {message != "" && (
              <MessageComponent message={message} type={"error"} />
            )}
          </>
        )}
      </Content>
    </Container>
  );
}
