import { ActivityIndicator, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useSession } from "@/services/AuthContext";
import { StyledButton } from "./styles";
import { MainContainer } from "@/app/styles";
import ProfileCard from "@/components/ProfileCard";

export default function ProfileScreen() {
  const { session, isLoading } = useSession();
  const user = session?.user;
  console.log("session222222222222", user);

  return (
    <MainContainer>
      {isLoading || !user ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ProfileCard user={user} />
      )}
    </MainContainer>
  );
}
