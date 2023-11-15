import { Text, View } from "react-native";
import {
  Container,
  HeaderView,
  DashContainer,
  ResumeContainer,
  DetailView,
  CenteredTextContainer,
  TextPieChart,
} from "./styles";
import PieChart from "react-native-pie-chart";
import { AccordionItem } from "../../components/Accordion";

import SelectDropdown from "react-native-select-dropdown";

export function Home() {
  const widthAndHeight = 250;
  const series = [2315, 350];
  const sliceColor = ["#4aac59", "#b52f20"];

  const countries = [
    { label: "01/2023", value: "01-2023" },
    { label: "02/2023", value: "02-2023" },
    { label: "03/2023", value: "03-2023" },
  ];

  const handleSelect = (item, index) => {
    console.log("Selecionado:", item, index);
  };

  return (
    <Container showsVerticalScrollIndicator={false}>
      <HeaderView>
        <Text>Selecione um mês</Text>
        <SelectDropdown
          buttonStyle={{
            backgroundColor: "#f4f4f4",
            color: "white",
            width: "80%",
          }}
          rowStyle={{ backgroundColor: "lightgray" }}
          data={countries}
          onSelect={handleSelect}
          defaultValue={countries[0]}
          buttonTextAfterSelection={(item, index) => item.label}
          rowTextForSelection={(item, index) => item.label}
        />
      </HeaderView>
      <DashContainer>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.75}
          coverFill={"#FFF"}
        />
        <CenteredTextContainer>
          <Text>A receber em</Text>
          <TextPieChart>14/11/2023</TextPieChart>
        </CenteredTextContainer>
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
        <AccordionItem title="Descontos" value={350} type={"Descontos"}>
          <DetailView>
            <Text>Desconto</Text>
            <Text>R$350,00</Text>
          </DetailView>
        </AccordionItem>
      </ResumeContainer>
    </Container>
  );
}
