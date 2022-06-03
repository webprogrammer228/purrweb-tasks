import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { HeaderLayout } from "../UI/header";
import { Logo } from "../UI/header/Logo/Logo";
import React, { useState } from "react";
import { Main } from "../UI/Main";
import { FooterLayout } from "../UI/footer";
import { TopBlock } from "../UI/footer/TopBlock";
import { BottomBlock } from "../UI/footer/BottomBlock";
import { store } from "../store";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { Router } from "next/router";
import { Loader, LoaderWrapper } from "../UI/Loader/Loader";

function MyApp({ Component, pageProps }: AppProps) {
  const name = Cookies.get("username");
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });

  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });

  return (
    <Provider store={store}>
      <HeaderLayout name={name} />
      <Main>
        {loading && (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        )}
        <Component {...pageProps} />
      </Main>
      <FooterLayout />
    </Provider>
  );
}

export default MyApp;
