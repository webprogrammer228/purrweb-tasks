import React from "react";
import { Logo } from "../../header/Logo/Logo";
import styled from "styled-components";

const TopBlock = () => {
  return (
    <Wrapper>
      <Logo
        height="42px"
        width="42px"
        color="#FFFFFF"
        secondaryColor="#FC5842"
      />
      <UnderLogoDescription>
        Ut enim ad minim veniam quis nostrud exercitation ea commodo
      </UnderLogoDescription>
    </Wrapper>
  );
};

export default TopBlock;

const Wrapper = styled.div`
  border-bottom: 1px solid #393939;
  width: 100%;
  margin-bottom: 44px;

  @media (max-width: 550px) {
    margin-bottom: 32px;
  }
`;

const UnderLogoDescription = styled.p`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;

  max-width: 322px;
  margin-top: 24px;

  margin-bottom: 60px;

  color: #c7c7c7;

  @media (max-width: 550px) {
    line-height: 23px;
    margin-top: 24px;
    margin-bottom: 30px;
    font-size: 16px;
  }
`;
