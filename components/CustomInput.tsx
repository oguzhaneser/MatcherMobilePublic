import styled from "styled-components/native";
import { TextInput } from "react-native";

const StyledInput = styled(TextInput)`
  background-color: ${({ theme }) => theme.Colors.white};
  color: ${({ theme }) => theme.Colors.text};
  border-radius: ${({ theme }) => theme.BorderRadius.m}px;
  padding: ${({ theme }) => theme.Spacing.s}px;
  margin: ${({ theme }) => theme.Spacing.s}px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const CustomInput = ({ ...props }) => {
  return <StyledInput {...props} />;
};
