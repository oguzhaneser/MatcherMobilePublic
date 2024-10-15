import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const SafeArea = styled(SafeAreaView).attrs(({ theme, edges }) => ({
  edges: edges || ["top", "bottom"],
}))`
  flex: 1;
  background-color: ${({ theme }) => theme.Colors.background};
`;

export const MainContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.Colors.background};
  padding: ${(props) => props.theme.Spacing.s}px;
`;

export const CenteredContainer = styled.View`
  flex: 1;
  justify-content: center;
`;
