import React from "react";
import styled from "styled-components";

type Props = {
  children?: React.ReactNode;
};

const HeaderLayout = ({ children }: Props) => {
  return (
    <header>
      <Header>{children}</Header>
    </header>
  );
};

export default HeaderLayout;

const Header = styled.div`
  width: 1270px;
  height: 100px;
  margin: 0 50px 65px;

  display: flex;
  align-items: center;
`;
