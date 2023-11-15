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

export function ConfigCenter() {
  const { setUser } = useAuth();

  function handleLogout() {
    setUser("");
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
            <Text>GG</Text>
          </ViewName>

          <ViewInfosName>
            <Text>Gustavo Antonio Gonçalves</Text>
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
