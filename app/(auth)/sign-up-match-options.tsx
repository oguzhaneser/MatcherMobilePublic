import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { MainContainer, SafeArea } from "../styles";
import { endpoints, request } from "@/services/Api";
import { MatchOption, Option, User } from "@/types";
import styled from "styled-components/native";
import { CustomCheckBox } from "@/components/CustomCheckBox";
import { CustomButton } from "@/components/CustomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useSession } from "@/services/AuthContext";

const MatchOptionContainer = styled.View`
  background-color: ${({ theme }) => theme.Colors.white};
  border-radius: ${({ theme }) => theme.BorderRadius.m}px;
  padding: ${({ theme }) => theme.Spacing.s}px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

const MatchOptionTitle = styled.Text`
  color: ${({ theme }) => theme.Colors.brand};
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: center;
`;

const OptionsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.Spacing.xs}px;
  justify-content: center;
`;

export default function SignUpMatchOptions() {
  const { signIn } = useSession();
  const [matchOptions, setMatchOptions] = useState<MatchOption[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const { user } = useLocalSearchParams();

  const [newUser, setNewUser] = useState<User>(
    user && typeof user === "string" ? JSON.parse(user) : user
  );

  const handleSubmit = () => {
    if (!user) return;

    const body = {
      ...newUser,
      userOptions: selectedOptions.map((opt) => ({
        optionId: opt.id,
      })),
    };

    console.log("register body", JSON.stringify(body));

    request({
      endpoint: endpoints.register,
      method: "POST",
      data: JSON.stringify(body),
    })
      .then((res) => {
        console.log("register res", res);

        signIn({
          username: newUser.username,
          password: newUser.password,
        })
          .then((res) => {
            if (res) router.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    request({
      endpoint: endpoints.matchOptions,
      method: "GET",
    })
      .then((res) => {
        if (res && res.length) setMatchOptions(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <MainContainer>
      {loading && <Text>Loading...</Text>}
      <View
        style={{
          gap: 8,
        }}
      >
        {matchOptions.map((matchOption) => (
          <MatchOptionContainer key={matchOption.id}>
            <MatchOptionTitle>{matchOption.name}</MatchOptionTitle>
            <OptionsContainer>
              {matchOption.options.map((option) => (
                <View key={option.id} style={{}}>
                  <CustomCheckBox
                    checked={
                      selectedOptions.find((op) => op.id === option.id)
                        ? true
                        : false
                    }
                    onPress={() => {
                      if (selectedOptions.find((op) => op.id === option.id)) {
                        setSelectedOptions(
                          selectedOptions.filter((op) => op.id !== option.id)
                        );
                      } else {
                        setSelectedOptions([...selectedOptions, option]);
                      }
                    }}
                    title={option.name}
                  />
                </View>
              ))}
            </OptionsContainer>
          </MatchOptionContainer>
        ))}
      </View>
      <CustomButton
        onPress={handleSubmit}
        title="Register"
        icon={
          <MaterialCommunityIcons name="account-plus" size={20} color="white" />
        }
      />
    </MainContainer>
  );
}
