import styled from "styled-components";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #729e51;
`;

export const MainView = styled.View`
  margin-top: 20%;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  max-width: 400px;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #cfe2ff;
  border-radius: 12px;
`;
export const Title = styled.Text`
  color: #3d8bfd;
  font-weight: bold;
  font-size: 20px;
  padding: 4px;
`;

export const DetailsInfo = styled.View`
  background-color: #a3cfbb;
  margin-bottom: 24px;
  border-radius: 8px;
  padding: 12px;
`;

export const TextDetail = styled.Text`
  color: #198754;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 24px;
`;

export const StyledText = styled.Text`
  background-color: #146c43;
  color: #fff;
  padding: 4px;
  border-radius: 20px;
`;
