import React from "react";
import styled from "styled-components";
import Link from "next/link";

const BottomBlock = () => {
  return (
    <Wrapper>
      <Text>Copyright © 2022 GScore | All Rights Reserved |</Text>
      <Links>
        <Link href="#"> Cookies </Link>
        <Text>| </Text>
        <Link href="#"> Privacy Policy </Link>
      </Links>
    </Wrapper>
  );
};

export default BottomBlock;

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 42px;
`;

const Text = styled.p`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;

  color: #c7c7c7;
`;

const Links = styled.div`
  display: flex;
  align-items: center;

  a {
    font-family: "Inter";
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
