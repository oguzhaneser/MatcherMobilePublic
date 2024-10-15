import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerTitle: "Sign Up",
        }}
      />
      <Stack.Screen
        name="sign-up-match-options"
        options={{
          headerTitle: "Match Options",
        }}
      />
    </Stack>
  );
}
