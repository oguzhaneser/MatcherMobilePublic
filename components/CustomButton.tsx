import styled from "styled-components/native";
import { FontAwesome6 } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";

const StyledTouchable = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.Colors.button};
  padding: ${({ theme }) => theme.Spacing.s}px;
  margin: ${({ theme }) => theme.Spacing.s}px;
  border-radius: ${({ theme }) => theme.BorderRadius.m}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.Spacing.s}px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

const StyledText = styled.Text`
  color: ${({ theme }) => theme.Colors.white};
`;

const StyledIcon = styled(FontAwesome6).attrs(({ theme }) => ({
  size: 24,
  color: theme.Colors.white,
}))`
  color: ${({ theme }) => theme.Colors.white};
`;

interface CustomButtonProps {
  title: string;
  icon?: React.ReactNode;
  onPress: () => void;
  loading?: boolean;
}

export const CustomButton = ({
  title,
  icon,
  onPress,
  loading,
}: CustomButtonProps) => {
  return (
    <StyledTouchable onPress={loading ? () => null : onPress}>
      <StyledText>{title}</StyledText>
      {loading ? <ActivityIndicator color={"white"} size={24} /> : icon && icon}
    </StyledTouchable>
  );
};
