import { Feather } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import { Container, MainView } from "./styles";
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
          <View
            style={{
              borderRadius: 100,
              backgroundColor: "#c1c2c1",
              width: "20%",
              height: 80,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <Text>GG</Text>
          </View>

          <View
            style={{
              width: "80%",
              marginTop: 12,
              paddingBottom: 8,
              borderBottomColor: "#c1c2c1",
              borderBottomWidth: 1,
              alignItems: "center",
            }}
          >
            <Text>Gustavo Antonio Gonçalves</Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
            paddingLeft: 40,
            alignItems: "flex-start",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <MaterialIcons name="lock-outline" size={24} color="black" />
            <Text style={{ marginLeft: 4 }}>Alterar senha</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleLogout}
          >
            <Feather name="log-out" size={24} color="black" />
            <Text style={{ marginLeft: 4 }}>Sair do aplicativo</Text>
          </TouchableOpacity>
        </View>
      </MainView>
    </Container>
  );
}
