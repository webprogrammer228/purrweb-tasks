import Cookies from "js-cookie";

export enum CookiesEnum {
  TOKEN = 'token',
  USERNAME = 'username'
}

export const token = Cookies.get(CookiesEnum.TOKEN);
export const setTokenToCookies = (value: string) => Cookies.set(CookiesEnum.TOKEN, value);
