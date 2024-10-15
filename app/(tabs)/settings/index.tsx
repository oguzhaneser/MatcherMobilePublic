import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Button } from "react-native";
import { useSession } from "@/services/AuthContext";

import styled from "styled-components/native";

const StyledButton = styled(Button).attrs(({ theme }) => {
  return {
    color: theme.Colors.button,
  };
})``;

export default function SettingsScreen() {
  const { signOut } = useSession();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <StyledButton
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
