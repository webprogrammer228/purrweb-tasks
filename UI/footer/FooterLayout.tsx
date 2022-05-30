import React from "react";
import styled from "styled-components";

type Props = {
  children?: React.ReactNode;
};

const FooterLayout = ({ children }: Props) => {
  return <Footer>{children}</Footer>;
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
