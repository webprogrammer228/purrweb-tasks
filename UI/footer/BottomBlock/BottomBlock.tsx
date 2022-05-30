import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { FBIcon } from "./Icons/FBIcon";
import { TwitterIcon } from "./Icons/TwitterIcon";
import { LinkedinIcon } from "./Icons/LinkedinIcon";

const BottomBlock = () => {
  return (
    <Wrapper justifyContent="space-between">
      <Wrapper>
        <Text>
          Copyright © 2022 GScore | All Rights Reserved |{/*<Links>*/}
          <Link href="#"> Cookies </Link>
          <span>| </span>
          <Link href="#"> Privacy Policy </Link>
          {/*</Links>*/}
        </Text>
      </Wrapper>
      <Icons>
        <FBIcon />
        <TwitterIcon />
        <LinkedinIcon />
      </Icons>
    </Wrapper>
  );
};

export default BottomBlock;

type WrapperProps = {
  justifyContent?: string;
};

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  margin-bottom: 42px;
  flex-wrap: wrap;
  justify-content: ${(props) => props.justifyContent};

  @media (max-width: 550px) {
    text-align: center;
    justify-content: center;
  }

  @media (max-width: 900px) {
    margin-bottom: 24px;
  }
`;

const Text = styled.p`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;

  color: #c7c7c7;

  & > a {
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 30px;

    text-align: center;
    text-decoration-line: underline;

    color: #ffffff;

    margin: 0 5px;
  }
`;

const Icons = styled.div`
  svg {
    &:first-child {
      margin-left: -10px;
    }
    margin-left: 16px;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }
`;
