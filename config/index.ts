import Cookies from "js-cookie";

export const config = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length",
};

export const configLogin = {
  Authorization: `Bearer ${Cookies.get("token")}`,
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length",
};

export const URL = process.env.NEXT_PUBLIC_URL;
