import React from "react";
import { useStorageState } from "./useStorageState";
import { endpoints, request } from "./Api";
import { Session } from "@/types";
import { Alert } from "react-native";

interface SignInProps {
  username: string;
  password: string;
}

const AuthContext = React.createContext<{
  signIn: (props: SignInProps) => Promise<boolean>;
  signOut: () => void;
  session?: Session | null;
  isLoading: boolean;
}>({
  signIn: async () => false,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] =
    useStorageState<Session>("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async ({ username, password }: SignInProps) => {
          let result = false;
          try {
            const response = await request({
              endpoint: endpoints.accounts,
              method: "POST",
              data: { username, password },
            });
            if (response.isSuccess) {
              const resp = response.data as Session;
              console.log("signIn response", resp);

              console.log("setSession");

              setSession(resp);
              result = true;
            } else {
              Alert.alert("Error", response.message);
            }
          } catch (error) {
            console.log("signIn error", error);
            Alert.alert("Error", "An error occurred while signing in.");
          }
          return result;
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
