import React from "react";
import styled from "styled-components";

type Props = {
  children?: React.ReactNode;
};

const FooterLayout = ({ children }: Props) => {
  return (
    <footer>
      <Footer>{children}</Footer>
    </footer>
  );
};

export default FooterLayout;

const Footer = styled.div`
  margin: 0 50px;

  display: flex;
  flex-direction: column;
`;
