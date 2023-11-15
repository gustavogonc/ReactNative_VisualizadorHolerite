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

import { HomeSkeleton } from "../../components/HomeSkeleton";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../../lib/axios";

import SelectDropdown from "react-native-select-dropdown";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth";

export function Home() {
  const [mesesPagamento, setMesesPagamento] = useState([]);
  const [mesesList, setMesesList] = useState([]);
  const [dadosMes, setDadosMes] = useState([]);
  const [isListReady, setIsListReady] = useState(false);
  const [valorPadraoDropDown, setValorPadraoDropDown] = useState(null);
  const [loading, setLoading] = useState(true);
  const widthAndHeight = 250;
  const series = [dadosMes.mes?.total_proventos, dadosMes.mes?.total_descontos];
  const sliceColor = ["#4aac59", "#b52f20"];

  const { id } = useAuth();

  const FormatarMoeda = (value) => {
    let options = { style: "currency", currency: "BRL" };
    return value.toLocaleString("pt-BR", options);
  };

  const handleSelect = (item, index) => {
    console.log("Selecionado:", item, index);
    const [mes, ano] = item.value.split("-");
    ConsultaDadosMes(mes, ano);
  };

  async function ConsultaDadosMes(mes, ano) {
    var info = {
      id_funcionario: id,
      mes: mes,
      ano: ano,
    };
    try {
      const response = await api.post("App/valoresMes", info);

      if (response.status == 200) {
        const data = response.data[0];
        setDadosMes(data);
      }
    } catch (error) {
      console.log("erro ao chamar api " + error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`App/${id}`);
        if (response.status == 200) {
          setMesesPagamento(response.data);

          const newList = response.data.map((item) => ({
            label: `${item.mes}/${item.ano}`,
            value: `${item.mes}-${item.ano}`,
          }));
          setMesesList(newList);

          if (newList.length > 0) {
            setValorPadraoDropDown(newList[0]);
            const [mes, ano] = newList[0].value.split("-");
            ConsultaDadosMes(mes, ano);
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
  }, [id]);

  useEffect(() => {
    if (isListReady) {
      setLoading(false);
    }
  }, [isListReady]);

  const verificaData = (date) => {
    if (date > Date.now()) {
      return "A receber em";
    } else {
      return "Recebeu em";
    }
  };

  return (
    <Container showsVerticalScrollIndicator={false}>
      {loading && <HomeSkeleton />}
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
              <Text>{verificaData(dadosMes.mes?.data_pagamento)}</Text>
              <TextPieChart>{dadosMes.mes?.data_pagamento}</TextPieChart>
            </CenteredTextContainer>
          </DashContainer>
          <ResumeContainer>
            <View
              style={{
                borderBottomColor: "#e1e2e1",
                borderBottomWidth: 1,
              }}
            >
              <AccordionItem
                title="Proventos"
                value={dadosMes.mes?.total_proventos}
                type={"Proventos"}
              >
                {dadosMes.detalhes
                  ?.filter((d) => d.tipo_valor === "Provento")
                  .map((detalhe, index) => (
                    <DetailView key={index}>
                      <Text>{detalhe.nome_valor}</Text>
                      <Text>{FormatarMoeda(detalhe.valor)}</Text>
                    </DetailView>
                  ))}
              </AccordionItem>
            </View>
            <AccordionItem
              title="Descontos"
              value={dadosMes.mes?.total_descontos}
              type={"Descontos"}
            >
              {dadosMes.detalhes
                ?.filter((d) => d.tipo_valor === "Desconto")
                .map((detalhe, index) => (
                  <DetailView key={index}>
                    <Text>{detalhe.nome_valor}</Text>
                    <Text>{FormatarMoeda(detalhe.valor)}</Text>
                  </DetailView>
                ))}
            </AccordionItem>
          </ResumeContainer>
        </View>
      )}
    </Container>
  );
}
