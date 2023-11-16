import React, { Component } from "react";
import { Text, View, Image } from "react-native";

import {
  Container,
  Title,
  MainView,
  TitleContainer,
  DetailsInfo,
  TextDetail,
  StyledText,
} from "./styles";
import { Feather } from "@expo/vector-icons";

import nodata from "../../assets/nodata1.png";
export function NoData() {
  return (
    <Container showsVerticalScrollIndicator={false}>
      <MainView>
        <TitleContainer>
          <Feather
            name="info"
            size={24}
            color="#007aff"
            style={{ marginRight: "2%" }}
          />
          <Title>Oops! Ainda não há dados a serem exibidos</Title>
        </TitleContainer>
        <Image source={nodata} />

        <DetailsInfo>
          <TextDetail>
            Aguarde até o lançamento do próximo holerite para conseguir
            visualizar suas informações de pagamento!
          </TextDetail>
          <TextDetail>
            Em caso de dúvidas, entre em contato com o seu{" "}
            <StyledText>Departamento Pessoal</StyledText>.
          </TextDetail>
        </DetailsInfo>
      </MainView>
    </Container>
  );
}
