import axios, { AxiosError, AxiosResponse } from "axios";
import { Errors } from "../types/type";

const URL: string = process.env.NEXT_PUBLIC_URL_SIGNUP!;

const config = {
  headers: {
    withCredentials: true,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": true,
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length",
  },
};

export const signupUser = async (
  username: string,
  email: string | number,
  password: string | number
) => {
  let data = JSON.parse(
    `{"email": "${email}", 
    "username": "${username}", 
    "password": "${password}"}`
  );
  const response = await axios
    .post(URL, data, config)
    .then((response: AxiosResponse) => console.log(response.data))
    .catch((e: AxiosError<Errors>) => console.log(e.response?.data.message));
  return response;
};
