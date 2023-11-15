import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  padding-top: 16px;
  padding-left: 1px;
  padding-right: 1px;
  background-color: #729e51;
`;

export const MainView = styled.View`
  flex: 1;
  margin-top: 36px;
  background-color: #fafafa;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-left-color: #c1c2c1;
  border-left-width: 1px;
  border-left-style: solid;
`;

export const ViewName = styled.View`
  background-color: #c1c2c1;
  width: 20%;
  height: 80px;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`;

export const ViewInfosName = styled.View`
  width: 80%;
  margin-top: 12px;
  padding-bottom: 8px;
  border-bottom-color: #c1c2c1;
  border-bottom-width: 1px;
  align-items: center;
`;

export const ContainerButton = styled.View`
  margin-top: 12px;
  padding-left: 40px;
  align-items: flex-start;
`;

export const StyledButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
