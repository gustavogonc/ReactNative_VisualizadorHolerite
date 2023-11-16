import styled from "styled-components";
import { Text } from "react-native";

export const Container = styled.View`
  background-color: rgba(24, 24, 24, 0.6);
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.View`
  background-color: #fff;
  width: 80%;
  padding-top: 24px;
  padding-bottom: 24px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border-left-color: #c1c2c1;
  border-left-width: 1px;
  border-left-style: solid;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  margin-bottom: 24px;
`;

export const PasswordInput = styled.View`
  width: 90%;
  margin-top: 6px;
`;

export const LabelSenha = styled.Text`
  margin-bottom: 6px;
`;

export const InputSenha = styled.TextInput`
  color: #000;
  background-color: #f9f9f9;
  padding: 6px;
  border-width: 0px 0px 1px 0px;
  border-color: #000;
  border-radius: 4px;
`;

export const ButtonArea = styled.View`
  flex-direction: row;
  width: 90%;
  margin-top: 8px;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonBack = styled.TouchableOpacity`
  width: 45%;
  align-items: center;
  margin-top: 14px;
  margin-bottom: 14px;
  padding: 8px;
  background-color: #007aff;
  border-radius: 8px;
`;

export const Button = styled.TouchableOpacity`
  width: 45%;
  align-items: center;
  margin-top: 14px;
  margin-bottom: 14px;
  padding: 8px;
  background-color: #4aac59;
  border-radius: 8px;
`;

export const TitleButton = styled.Text`
  color: #fff;
  font-weight: bold;
`;
