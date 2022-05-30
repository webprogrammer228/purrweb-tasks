import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { HeaderLayout } from "../UI/header";
import { Logo } from "../UI/header/Logo/Logo";
import React from "react";
import { Main } from "../UI/Main";
import { FooterLayout } from "../UI/footer";
import { TopBlock } from "../UI/footer/TopBlock";
import { BottomBlock } from "../UI/footer/BottomBlock";
import { store } from "../store";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

function MyApp({ Component, pageProps }: AppProps) {
  const name = Cookies.get("username");

  const UserBlock = dynamic(() => import("../components/UserBlock"));
  const MobileMenu = dynamic(() => import("../components/MobileMenu"));

  return (
    <Provider store={store}>
      <HeaderLayout>
        <Logo
          height="42px"
          width="42px"
          color="#FFFFFF"
          secondaryColor="#FC5842"
        />
        {name && <UserBlock name={name} />}
        {name && <MobileMenu />}
      </HeaderLayout>
      <Main>
        <Component {...pageProps} />
      </Main>
      <FooterLayout>
        <TopBlock />
        <BottomBlock />
      </FooterLayout>
    </Provider>
  );
}

export default MyApp;
