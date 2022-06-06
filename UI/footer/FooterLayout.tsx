import React from "react";
import styled from "styled-components";
import { BottomBlock, TopBlock } from "./index";

const FooterLayout = () => {
  return (
    <Footer>
      <TopBlock />
      <BottomBlock />
    </Footer>
  );
};

export default FooterLayout;

const Footer = styled.footer`
  margin: 0 50px;

  display: flex;
  flex-direction: column;

  @media (max-width: 550px) {
    margin: 0 25px;
  }
`;
