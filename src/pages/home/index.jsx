import { ActivityIndicator, Text, View } from "react-native";
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

import RNPickerSelect from "react-native-picker-select";

import SelectDropdown from "react-native-select-dropdown";
import { useEffect, useState } from "react";

export function Home() {
  const [mesesPagamento, setMesesPagamento] = useState([]);
  const [mesesList, setMesesList] = useState([]);
  const [isListReady, setIsListReady] = useState(false);
  const [valorPadraoDropDown, setValorPadraoDropDown] = useState(null);
  const [loading, setLoading] = useState(true);
  const widthAndHeight = 250;
  const series = [2315, 350];
  const sliceColor = ["#4aac59", "#b52f20"];

  const handleSelect = (item, index) => {
    console.log("Selecionado:", item, index);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("App/1");
        if (response.status == 200) {
          setMesesPagamento(response.data);

          const newList = response.data.map((item) => ({
            label: `${item.mes}/${item.ano}`,
            value: `${item.mes}-${item.ano}`,
          }));
          setMesesList(newList);

          if (newList.length > 0) {
            setValorPadraoDropDown(newList[0]);
          }
          setIsListReady(true);
        }
      } catch (error) {
        console.log("Erro ao chamar API", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (isListReady) {
      setLoading(false);
    }
  }, [isListReady]);

  return (
    <Container showsVerticalScrollIndicator={false}>
      {loading && <ActivityIndicator />}
      {!loading && (
        <View>
          <HeaderView>
            {isListReady && !loading && (
              <View>
                <Text>Selecione um mês</Text>
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
              </View>
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
        </View>
      )}
    </Container>
  );
}
