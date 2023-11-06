import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Container, Title, EndValue, MainTitle, Amount } from "./styles";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export function AccordionItem({ title, children, value, type }) {
  const [expanded, setExpanded] = useState(false);

  function toggleItem() {
    setExpanded(!expanded);
  }

  const FormatarMoeda = (value) => {
    let options = { style: "currency", currency: "BRL" };
    return value.toLocaleString("pt-BR", options);
  };

  return (
    <Container>
      <Title>
        <MainTitle onPress={toggleItem}>
          <Entypo name="plus" size={24} color="black" />
          <FontAwesome
            name="square"
            size={24}
            color={type == "Proventos" ? "#4aac59" : "#b52f20"}
            style={{ marginRight: 4 }}
          />
          <Text>{title}</Text>
        </MainTitle>

        <EndValue>
          <Amount>{value ? FormatarMoeda(value) : FormatarMoeda(0)}</Amount>
        </EndValue>
      </Title>

      {expanded && <View>{children}</View>}
    </Container>
  );
}
