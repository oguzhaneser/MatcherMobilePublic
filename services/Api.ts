import { Response } from "@/types";
import axios from "axios";

const testUrl = "http://192.168.1.100:37642/api/";
const prodUrl = "";

const axiosURL = testUrl;

export const endpoints = {
  matchOptions: "MatchOptions",
  accounts: "Accounts",
  register: "Accounts/Register",
  chatMessages: "ChatMessages",
  chatRooms: "ChatRooms",
  options: "Options",
  users: "Users",
};

interface RequestConfig {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  token?: string;
}

export const request = async ({
  endpoint,
  method,
  data,
  token,
}: RequestConfig) => {
  const url = axiosURL + endpoint;

  const headers = {
    "Content-Type": "application/json",
    Authorization: "",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
    data,
    url,
  };

  try {
    const response = await axios(config);
    return response.data as Response<any>;
  } catch (error: TypeError | any) {
    if (error.response) {
      return new Response(false, error.response.data, null);
    }
    throw error;
  }
};
