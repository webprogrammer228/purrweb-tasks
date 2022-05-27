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
import UserBlock from "../components/UserBlock";
import { store } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <HeaderLayout>
        <Logo
          height="42px"
          width="42px"
          color="#FFFFFF"
          secondaryColor="#FC5842"
        />
        <UserBlock />
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
