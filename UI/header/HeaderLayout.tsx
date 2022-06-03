import React from "react";
import styled from "styled-components";
import {Logo} from "./Logo/Logo";
import dynamic from "next/dynamic";

type Props = {
  name?: string;
};

const HeaderLayout = ({ name }: Props) => {
  const UserBlock = dynamic(() => import("../../components/UserBlock"));
  const MobileMenu = dynamic(() => import("../../components/MobileMenu"));
  return <Header>
    <Logo
      height="42px"
      width="42px"
      color="#FFFFFF"
      secondaryColor="#FC5842"
    />
    {name && <UserBlock name={name} />}
    <MobileMenu />
  </Header>;
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
