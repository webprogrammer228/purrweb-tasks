import type { NextPage } from "next";
import { HeaderLayout } from "../UI/header";
import { Logo } from "../UI/header/Logo/Logo";
import styled from "styled-components";
import { Card } from "../UI/content";

const Home: NextPage = () => {
  return (
    <>
      <HeaderLayout>
        <Logo
          height="42px"
          width="42px"
          color="#FFFFFF"
          secondaryColor="#FC5842"
        />
      </HeaderLayout>
      <GreetingHome>Get started with Gscore today!</GreetingHome>
      <Card />
    </>
  );
};

export default Home;

const GreetingHome = styled.h1`
  font-family: "Thicccboi", sans-serif;
  font-size: 44px;
  font-weight: 700;
  color: #ffffff;
  text-align: center;

  margin-bottom: 98px;
`;
