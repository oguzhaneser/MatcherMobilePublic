import React, { useState, useEffect } from "react";
import { MainContainer, SafeArea } from "../styles";
import { CustomInput } from "@/components/CustomInput";
import { CustomButton } from "@/components/CustomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { User } from "@/types";
import { Alert, Pressable, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const ErrorText = styled.Text`
  color: red;
  text-align: center;
`;

export default function SignUp() {
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    surname: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    gender: 0,
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (key: string, value: string | number) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = () => {
    if (
      user.name === "" ||
      user.surname === "" ||
      user.username === "" ||
      user.password === "" ||
      user.email === "" ||
      user.gender === 0
    ) {
      setErrorMessage("Please fill all required fields.");
      return;
    }

    if (user.password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (user.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    router.push({
      pathname: "/sign-up-match-options",
      params: { user: JSON.stringify(user) },
    });
  };

  return (
    <MainContainer>
      <CustomInput
        placeholder="(*) Name"
        onChangeText={(text: string) => handleChange("name", text)}
        value={user.name}
      />
      <CustomInput
        placeholder="(*) Surname"
        onChangeText={(text: string) => handleChange("surname", text)}
        value={user.surname}
      />
      <CustomInput
        placeholder="Phone"
        onChangeText={(text: string) => handleChange("phoneNumber", text)}
        value={user.phoneNumber}
        keyboardType="phone-pad"
      />
      <TouchableOpacity
        onPress={() => {
          Alert.alert("Select Gender", "", [
            {
              text: "Male",
              onPress: () => handleChange("gender", 1),
              style: "default",
            },
            {
              text: "Female",
              onPress: () => handleChange("gender", 2),
              style: "default",
            },
          ]);
        }}
      >
        <CustomInput
          placeholder={
            user.gender === 1
              ? "Male"
              : user.gender === 2
                ? "Female"
                : "(*) Gender"
          }
          editable={false}
        />
      </TouchableOpacity>
      <CustomInput
        placeholder="(*) Email"
        onChangeText={(text: string) => handleChange("email", text)}
        value={user.email}
      />
      <CustomInput
        placeholder="(*) Username"
        onChangeText={(text: string) => handleChange("username", text)}
        value={user.username}
      />
      <CustomInput
        placeholder="(*) Password"
        onChangeText={(text: string) => handleChange("password", text)}
        value={user.password}
      />
      <CustomInput
        placeholder="(*) Confirm Password"
        onChangeText={(text: string) => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry
      />

      <CustomButton
        onPress={() => {
          onSubmit();
        }}
        title="Next"
        icon={
          <MaterialCommunityIcons name="arrow-right" size={20} color="white" />
        }
      />
      {errorMessage !== "" && <ErrorText>{errorMessage}</ErrorText>}
    </MainContainer>
  );
}
