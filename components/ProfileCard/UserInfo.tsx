import styled from "styled-components/native";
import { View, Text } from "react-native";
import { User } from "@/types";

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.Spacing.s}px;
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.FontSizes.m};
  font-weight: ${({ theme }) => theme.FontWeights.bold};
`;

const Content = styled.Text``;

const UserInfo = ({ user }: { user: User }) => {
  return (
    <View>
      <Row>
        <Title>Username:</Title>
        <Content>{user.username}</Content>
      </Row>
      <Row>
        <Title>Name:</Title>
        <Content>{user.name}</Content>
      </Row>
      <Row>
        <Title>Surname:</Title>
        <Content>{user.surname}</Content>
      </Row>
      <Row>
        <Title>Gender:</Title>
        <Content>
          {user.gender === 1 ? "Male" : user.gender === 2 ? "Female" : "Other"}
        </Content>
      </Row>
      <Row>
        <Title>Email:</Title>
        <Content>{user.email}</Content>
      </Row>
      <Row>
        <Title>Phone:</Title>
        <Content>{user.phoneNumber}</Content>
      </Row>
    </View>
  );
};

export default UserInfo;
