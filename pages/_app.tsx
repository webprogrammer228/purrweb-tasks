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

  const UserBlock = dynamic(() => import("../components/UserBlock"));
  const MobileMenu = dynamic(() => import("../components/MobileMenu"));

  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });

  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });

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
        <MobileMenu />
      </HeaderLayout>
      <Main>
        {loading && (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        )}
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
