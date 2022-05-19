import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistor, store } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { HeaderLayout } from "../UI/header";
import { Logo } from "../UI/header/Logo/Logo";
import React from "react";
import { Main } from "../UI/checkout/Main";
import { FooterLayout } from "../UI/footer";
import { TopBlock } from "../UI/footer/TopBlock";
import { BottomBlock } from "../UI/footer/BottomBlock";
import UserBlock from "../components/UserBlock";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
