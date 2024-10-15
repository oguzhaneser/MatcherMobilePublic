import styled from "styled-components/native";

export const StyledButton = styled.Button.attrs(({ theme }) => {
  return {
    color: theme.Colors.button,
  };
})``;
