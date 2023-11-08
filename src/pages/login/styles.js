import styled from "styled-components";

export const Container = styled.SafeAreaView`
  background-color: #729e51;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  margin-bottom: 48px;
`;

export const Input = styled.TextInput`
  width: 80%;
  background-color: #c2c1c4;
  margin-bottom: 16px;
  padding: 15px;
  border-radius: 4px;
`;

export const ButtonContainer = styled.View`
  width: 80%;
  flex-direction: row;
`;

export const Button = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #188754;
  padding: 15px;
  border-radius: 4px;
`;

export const ButtonText = styled.Text`
  font-weight: 600;
  color: #fafafa;
`;
