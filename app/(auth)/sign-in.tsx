import { useState } from "react";
import { useSession } from "@/services/AuthContext";
import { CenteredContainer, MainContainer, SafeArea } from "../styles";
import { CustomInput } from "@/components/CustomInput";
import { CustomButton } from "@/components/CustomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { router } from "expo-router";
import { Alert } from "react-native";

const StyledIcon = styled(MaterialCommunityIcons).attrs(({ theme }) => ({
  size: 24,
  color: theme.Colors.white,
}))`
  color: ${({ theme }) => theme.Colors.white};
`;

export default function SignIn() {
  const { isLoading, signIn } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    signIn({
      username: username,
      password: password,
    }).then((result) => {
      if (result) router.push("/");
    });
  };

  return (
    <SafeArea>
      <MainContainer>
        <CenteredContainer>
          <CustomInput
            placeholder="Username"
            onChangeText={(text: string) => setUsername(text)}
            value={username}
          />
          <CustomInput
            placeholder="Password"
            onChangeText={(text: string) => setPassword(text)}
            value={password}
            secureTextEntry
          />

          <CustomButton
            onPress={onLogin}
            title="Sign In"
            icon={<StyledIcon name="login" />}
            loading={isLoading}
          />

          <CustomButton
            onPress={() => router.push("/sign-up")}
            title="Sign Up"
            icon={<StyledIcon name="account-plus" />}
            loading={isLoading}
          />
        </CenteredContainer>
      </MainContainer>
    </SafeArea>
  );
}
