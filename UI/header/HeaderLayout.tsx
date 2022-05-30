import React from "react";
import styled from "styled-components";

type Props = {
  children?: React.ReactNode;
};

const HeaderLayout = ({ children }: Props) => {
  return <Header>{children}</Header>;
};

export default HeaderLayout;

export const Header = styled.header`
  width: 100%;
  height: 100px;
  margin: 0 0 65px;

  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 680px) {
    margin: 0 0 30px;
    padding: 0 15px;
  }
`;
