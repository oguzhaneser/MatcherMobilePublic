import styled from "styled-components/native";
import { Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef } from "react";

const StyledIcon = styled(MaterialCommunityIcons).attrs(({ theme }) => ({
  size: 24,
  color: theme.Colors.white,
}))`
  color: ${({ theme }) => theme.Colors.button};
`;

const StyledTouchable = styled.TouchableOpacity`
  flex-direction: row;
  gap: ${({ theme }) => theme.Spacing.xxs}px;
  align-items: center;
  border-color: ${({ theme }) => theme.Colors.button};
  border-width: 1px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.BorderRadius.m}px;
  padding-horizontal: ${({ theme }) => theme.Spacing.xs}px;
`;

const StyledText = styled.Text`
  color: ${({ theme }) => theme.Colors.button};
`;

interface CustomCheckBoxProps {
  checked: boolean;
  title: string;
  onPress: () => void;
}

export const CustomCheckBox = ({
  checked,
  title,
  onPress,
}: CustomCheckBoxProps) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  const onCheckboxPress = () => {
    Animated.timing(slideAnim, {
      toValue: checked ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onPress();
  };
  return (
    <StyledTouchable onPress={onCheckboxPress}>
      <Animated.View
        style={{
          transform: [
            {
              translateX: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-24, 0],
              }),
            },
            {
              rotate: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["-45deg", "0deg"],
              }),
            },
          ],
        }}
      >
        <StyledIcon name="check" />
      </Animated.View>
      <StyledText>{title}</StyledText>
    </StyledTouchable>
  );
};
