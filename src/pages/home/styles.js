import styled from "styled-components";

export const Container = styled.ScrollView`
  flex: 1;
  padding: 16px;
  background-color: #729e51;
`;

export const OptionView = styled.FlatList``;

export const HeaderView = styled.View`
  background-color: #fafafa;
  height: 80px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

export const HeaderText = styled.Text``;

export const DashContainer = styled.View`
  background-color: #fafafa;
  height: 280px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const ResumeContainer = styled.View`
  background-color: #fafafa;
  border-radius: 8px;
  margin-bottom: 24px;
`;

export const DetailView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  margin-bottom: 4px;
  border-width: 0px 0px 1px 0px;
  border-color: #c1c2c1;
`;

export const FileButton = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #188754;
  height: 50px;
  margin-bottom: 48px;
  border-radius: 8px;
`;

export const ButtonText = styled.Text`
  font-weight: bold;
  color: #fafafa;
  font-size: 16px;
`;
