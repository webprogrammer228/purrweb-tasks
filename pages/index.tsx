import type { NextPage } from "next";
import { HeaderLayout } from "../UI/header";
import { Logo } from "../UI/header/Logo/Logo";
import styled from "styled-components";
import { Card } from "../UI/content";
import { FooterLayout } from "../UI/footer";
import { TopBlock } from "../UI/footer/TopBlock";
import { BottomBlock } from "../UI/footer/BottomBlock";
import Link from "next/link";

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
      <main>
        <GreetingHome>Get started with Gscore today!</GreetingHome>
        <Card />
        <UnderCardsTextBlock>
          <OfferText>Have more than 10 sites?</OfferText>
          <Link href="#">Contact us</Link>
        </UnderCardsTextBlock>
        <Line />
      </main>
      <FooterLayout>
        <TopBlock />
        <BottomBlock />
      </FooterLayout>
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

const UnderCardsTextBlock = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  a {
    font-family: "Thicccboi", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 30px;

    text-decoration-line: underline;
    margin-bottom: 42px;

    color: #fc5842;
  }
`;

const OfferText = styled.p`
  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;

  color: #ffffff;

  margin-bottom: 1px;
`;

const Line = styled.hr`
  background: #181818;
  margin-bottom: 60px;
`;
