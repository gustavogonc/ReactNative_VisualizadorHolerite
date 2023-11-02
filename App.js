import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import logo from "./src/assets/logo.png";
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <TextInput style={styles.input} placeholder="E-mail" />
      <TextInput style={styles.input} placeholder="Senha" />

      <StatusBar style="auto" />

      <View style={styles.textAreaButton}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#729e51",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginBottom: 48,
  },

  backgroundLogo: {
    backgroundColor: "#376827",
    padding: 5,
  },
  input: {
    width: "80%",
    backgroundColor: "#c2c1c4",
    marginBottom: 16,
    padding: 15,
  },
  textAreaButton: {
    width: "80%",
    flexDirection: "row",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#188754",
    padding: 15,
    borderRadius: 4,
    shadowColor: "#188754",
    shadowOffset: { width: -5, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },

  textButton: {
    fontWeight: "600",
    color: "#fafafa",
  },
});
