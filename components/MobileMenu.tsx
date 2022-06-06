import React, { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  Burger,
  CheckMark,
  CloseIcon,
  GearIcon,
  Logo,
  QuitIcon,
} from "../UI/icons";

import Link from "next/link";
import Cookies from "js-cookie";
import { Title } from "../UI/header";
import { Wrapper } from "../UI/Wrapper";

import { useOnClickOutside } from "../hooks/useClickOutside";

type Props = {
  name: string | undefined;
};
const MobileMenu: React.FC<Props> = ({ name }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isShowSubMenu, setIsShowSubMenu] = useState(false);

  const blockRef = useRef<HTMLDivElement>(null);
  const clickOutsidehandler = () => {
    setShowMenu(false);
  };
  useOnClickOutside(blockRef, clickOutsidehandler);

  return (
    <>
      {name && (
        <LineWrapper>
          <LineWrapper>
            {" "}
            <Burger color="#ffffff" onClick={() => setShowMenu(true)} />
          </LineWrapper>
          {showMenu && (
            <Menu ref={blockRef}>
              <MenuHeader>
                <CloseIcon onClick={() => setShowMenu(false)} />
                <Logo color="#FFFFFF" secondaryColor="#FC5842" />
              </MenuHeader>
              <MenuContent>
                <Wrapper onClick={() => setShowMenu(false)}>
                  <Link href="/subscriptions">My subscriptions</Link>
                </Wrapper>
                <Line style={{ color: "#393939" }} />
                <Wrapper
                  justifyContent="space-between"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => setIsShowSubMenu(!isShowSubMenu)}
                >
                  <Title>{name}</Title>
                  <CheckMark isShow={isShowSubMenu} />
                </Wrapper>
                <Line style={{ color: "#393939" }} />
                {isShowSubMenu && (
                  <>
                    <Wrapper onClick={() => setShowMenu(false)}>
                      <GearIcon color="#969696" />
                      <Link href="/settings">Settings</Link>
                    </Wrapper>
                    <Wrapper
                      onClick={() => {
                        setShowMenu(false);
                        Cookies.set("token", "");
                      }}
                    >
                      <QuitIcon color="#969696" />
                      <Link href="/">Logout</Link>
                    </Wrapper>
                  </>
                )}
              </MenuContent>
            </Menu>
          )}
        </LineWrapper>
      )}
    </>
  );
};

export default MobileMenu;

const LineWrapper = styled.div`
  position: relative;
  display: none;
  @media (max-width: 550px) {
    display: block;
  }
`;

const slideLeft = keyframes`
  from {
    right: -262px
  }

  to {
    right: 0;
  }
`;

const Menu = styled.div`
  display: none;
  width: 262px;
  height: 100%;
  animation: ${slideLeft} 0.5s linear;

  position: fixed;

  top: 0;
  right: 0;
  background-color: #272727;
  z-index: 1000;

  @media (max-width: 550px) {
    display: block;
  }
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 28px 24px 48px 28px;
  align-items: center;
`;

const MenuContent = styled.div`
  margin: 0 24px;

  a {
    font-family: "Thicccboi", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;

    text-align: center;
    text-decoration: none;

    color: #ffffff;
  }

  div {
    margin-top: 20px;
    align-items: center;
  }

  div > p:first-child {
    margin-left: 16px;
  }

  div > a {
    margin-left: 16px;
    color: #969696;
  }
`;

const Line = styled.hr`
  width: 100%;
  border: 1px solid #393939;
  margin-top: 20px;
`;
