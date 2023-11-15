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

import { api } from "../../lib/axios";

import SelectDropdown from "react-native-select-dropdown";
import { useEffect, useState } from "react";

export function Home() {
  const [mesesPagamento, setMesesPagamento] = useState([]);
  const [mesesList, setMesesList] = useState([]);
  const [valorPadraoDropDown, setValorPadraoDropDown] = useState(null);
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

  const ConvertObject = () => {
    const newList = mesesPagamento.map((item) => ({
      label: `${item.mes}/${item.ano}`,
      value: `${item.mes}-${item.ano}`,
    }));
    setMesesList(newList);

    if (newList.length > 0) {
      setValorPadraoDropDown(newList[newList.length - 1]);
    }
  };

  async function BuscaMeses() {
    try {
      const response = await api.get("App/1");

      if (response.status == 200) {
        setMesesPagamento(response.data);
      }
    } catch (error) {
      console.log("erro ao chamar api" + error);
    }
  }

  useEffect(() => {
    async function valor() {
      await BuscaMeses();

      ConvertObject();
    }

    valor();
  }, []);

  return (
    <Container showsVerticalScrollIndicator={false}>
      <HeaderView>
        <Text>Selecione um mês</Text>
        {valorPadraoDropDown && (
          <SelectDropdown
            buttonStyle={{
              backgroundColor: "#f4f4f4",
              color: "white",
              width: "80%",
            }}
            rowStyle={{ backgroundColor: "lightgray" }}
            data={mesesList}
            onSelect={handleSelect}
            defaultValue={valorPadraoDropDown}
            buttonTextAfterSelection={(item, index) => item.label}
            rowTextForSelection={(item, index) => item.label}
          />
        )}
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
