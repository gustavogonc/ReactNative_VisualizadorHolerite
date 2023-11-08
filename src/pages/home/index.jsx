import { Text, View, Platform } from "react-native";
import {
  Container,
  HeaderView,
  DashContainer,
  ResumeContainer,
  DetailView,
  FileButton,
  ButtonText,
} from "./styles";
import PieChart from "react-native-pie-chart";
import { AccordionItem } from "../../components/Accordion";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import { RenderReport } from "../../components/Report";
import { useState } from "react";

import { WebView } from "react-native-webview";

import api from "../../lib/axios";

export function Home() {
  const widthAndHeight = 250;
  const series = [1000, 200];
  const sliceColor = ["#4aac59", "#b52f20"];
  const [loading, setLoading] = useState(false);
  const [pdfBase64, setPdfBase64] = useState(null);

  const loadPdf = async () => {
    try {
      const response = await fetch("http://20.206.249.21:80/api/Pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const base64data = await response.text();
      setPdfBase64(base64data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderPdf = () => {
    return (
      <WebView
        originWhitelist={["*"]}
        source={{ uri: `data:application/pdf;base64,${pdfBase64}` }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("WebView error: ", nativeEvent);
        }}
        style={{ flex: 1, height: 700 }}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
      />
    );
  };

  return (
    <Container showsVerticalScrollIndicator={false}>
      <HeaderView>
        <Text>Selecione um mês</Text>
        <Text>setembro/2023</Text>
      </HeaderView>
      <DashContainer>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.75}
          coverFill={"#FFF"}
        />
      </DashContainer>
      <ResumeContainer>
        <View
          style={{
            borderBottomColor: "#e1e2e1",
            borderBottomWidth: 1,
          }}
        >
          <AccordionItem title="Proventos" value={2315} type={"Proventos"}>
            <DetailView>
              <Text>Salário base</Text>
              <Text>R$2.300,00</Text>
            </DetailView>
            <DetailView>
              <Text>Adicional</Text>
              <Text>R$15,00</Text>
            </DetailView>
          </AccordionItem>
        </View>
        <AccordionItem title="Descontos" value={15} type={"Descontos"}>
          <DetailView>
            <Text>Desconto</Text>
            <Text>R$15,00</Text>
          </DetailView>
        </AccordionItem>
      </ResumeContainer>

      <FileButton onPress={loadPdf}>
        <ButtonText>VISUALIZAR PDF</ButtonText>
      </FileButton>
      {pdfBase64 ? renderPdf() : null}
    </Container>
  );
}
