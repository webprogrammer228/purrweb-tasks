import React from "react";
import { LoginWrapper } from "../UI/header/Login/LoginWrapper";
import { Title } from "../UI/header/Login/Title";
import CheckMark from "./LoginBlock";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const UserBlock: React.FC = () => {
  const name = Cookies.get("username");
  const router = useRouter();
  return (
    <LoginWrapper>
      {name && (
        <>
          <Title
            onClick={() => router.push("/subscriptions")}
            color={router.asPath}
          >
            My subscriptions
          </Title>
          <CheckMark color="white" height="24px" width="24px" name={name} />
        </>
      )}
    </LoginWrapper>
  );
};

export default UserBlock;
