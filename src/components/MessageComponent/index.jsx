import { Container, Message } from "./styles";

import { Feather } from "@expo/vector-icons";

export function MessageComponent({ message, type }) {
  return (
    <Container>
      <Feather name="info" size={24} color="#a22029" />
      <Message> {message} </Message>
    </Container>
  );
}
