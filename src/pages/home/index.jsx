import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  Container,
  HeaderView,
  DashContainer,
  ResumeContainer,
  DetailView,
  CenteredTextContainer,
  TextPieChart,
  HeaderText,
} from "./styles";
import PieChart from "react-native-pie-chart";
import { AccordionItem } from "../../components/Accordion";

import { HomeSkeleton } from "../../components/HomeSkeleton";

import { api } from "../../lib/axios";

import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome } from "@expo/vector-icons";

import { useAuth } from "../../contexts/auth";

import { NoData } from "../../components/NoData";

export function Home() {
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

    if (id != "") {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (isListReady) {
      setLoading(false);
    }
  }, [isListReady]);

  const verificaData = (data) => {
    const date = new Date().toLocaleDateString();

    console.log("valor de data é: " + data);
    console.log("valor de date é: " + date);
    if (data >= date) {
      return "A receber em";
    } else {
      return "Recebeu em";
    }
  };

  if (!loading && mesesList.length == 0) {
    return <NoData />;
  }

  return (
    <Container showsVerticalScrollIndicator={false}>
      {loading && <HomeSkeleton />}

      {!loading && mesesList.length > 0 && (
        <View>
          <HeaderView>
            {isListReady && !loading && (
              <>
                <HeaderText>Selecione um mês</HeaderText>
                <SelectDropdown
                  buttonStyle={{
                    backgroundColor: "#f9f9f9",
                    color: "white",
                    width: "90%",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    borderRadius: 4,
                  }}
                  rowStyle={{ backgroundColor: "lightgray" }}
                  data={mesesList}
                  onSelect={handleSelect}
                  defaultValue={valorPadraoDropDown}
                  buttonTextAfterSelection={(item, index) => item.label}
                  rowTextForSelection={(item, index) => item.label}
                  renderDropdownIcon={() => (
                    <FontAwesome name="chevron-down" size={16} color="gray" />
                  )}
                  dropdownIconPosition="right"
                />
              </>
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
