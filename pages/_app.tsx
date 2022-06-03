import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import React, { useState } from "react";
import { Main } from "../UI/Main";
import { store } from "../store";

import { Router } from "next/router";
import { Loader, LoaderWrapper } from "../UI/Loader/Loader";
import { FooterLayout } from "../UI/footer";
import { HeaderLayout } from "../UI/header";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });

  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });

  return (
    <Provider store={store}>
      <HeaderLayout />
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
