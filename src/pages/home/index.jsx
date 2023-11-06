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
import { TouchableOpacity } from "react-native";
import { RenderReport } from "../../components/Report";

import RNHTMLtoPDF from "react-native-html-to-pdf";

export function Home() {
  const widthAndHeight = 250;
  const series = [1000, 200];
  const sliceColor = ["#4aac59", "#b52f20"];

  function handleReport() {
    RenderReport();
  }

  const createPDF = async () => {
    try {
      let PDFOptions = {
        html: "<h1>Generate PDF!</h1>",
        fileName: "file",
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      alert(file.filePath);
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
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
        <AccordionItem title="Descontos" value={15} type={"Descontos"}>
          <DetailView>
            <Text>Desconto</Text>
            <Text>R$15,00</Text>
          </DetailView>
        </AccordionItem>
      </ResumeContainer>

      <FileButton onPress={createPDF}>
        <ButtonText>VISUALIZAR PDF</ButtonText>
      </FileButton>
    </Container>
  );
}
