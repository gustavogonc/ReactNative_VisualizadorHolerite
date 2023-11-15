import { Feather } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Container,
  MainView,
  ViewName,
  ViewInfosName,
  ContainerButton,
  StyledButton,
} from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/auth";
import { useEffect, useState } from "react";

export function ConfigCenter() {
  const { setUser, signOut, nome } = useAuth();
  const [primeiraLetra, setPrimeiraLetra] = useState("");
  const [ultimaLetra, setUltimaLetra] = useState("");

  function Iniciais(name) {
    const info = name.split(" ");

    const primeiroNome = info[0].split("");
    const primeiraLetraNome = primeiroNome[0];

    const ultimaPosicao = info.length - 1;
    const ultimoNome = info[ultimaPosicao];

    const primeiraLetraUltimoNome = ultimoNome[0];

    setPrimeiraLetra(primeiraLetraNome.toUpperCase());
    setUltimaLetra(primeiraLetraUltimoNome.toUpperCase());
  }

  useEffect(() => {
    Iniciais(nome);
  }, [nome]);

  function handleLogout() {
    signOut();
  }
  return (
    <Container>
      <MainView>
        <View style={{ alignItems: "center" }}>
          <ViewName
            style={{
              borderRadius: 100,
            }}
          >
            <Text>{primeiraLetra + ultimaLetra}</Text>
          </ViewName>

          <ViewInfosName>
            <Text>{nome}</Text>
          </ViewInfosName>
        </View>

        <ContainerButton>
          <StyledButton
            style={{
              marginBottom: 12,
            }}
          >
            <MaterialIcons name="lock-outline" size={24} color="black" />
            <Text style={{ marginLeft: 4 }}>Alterar senha</Text>
          </StyledButton>
          <StyledButton
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleLogout}
          >
            <Feather name="log-out" size={24} color="black" />
            <Text style={{ marginLeft: 4 }}>Sair do aplicativo</Text>
          </StyledButton>
        </ContainerButton>
      </MainView>
    </Container>
  );
}
