import { View, Text } from "react-native";
import React from "react";
import { User } from "@/types";
import UserInfo from "./UserInfo";
import MatchOptions from "./MatchOptions";

const ProfileCard = ({ user }: { user: User }) => {
  return (
    <View>
      <Text>ProfileCard</Text>
      <Text>{user.name}</Text>
      <UserInfo user={user} />
      {user.userOptions && user.userOptions.length > 0 && (
        <MatchOptions options={user.userOptions} />
      )}
    </View>
  );
};

export default ProfileCard;
