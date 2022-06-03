import React from "react";
import { LoginWrapper, Title } from "../UI/header";
import { useRouter } from "next/router";
import LoginBlock from "./LoginBlock";

type UserBlockProps = {
  name: string;
};

const UserBlock: React.FC<UserBlockProps> = ({ name }) => {
  const router = useRouter();
  return (
    <LoginWrapper>
      <Title onClick={() => router.push("/subscriptions")} path={router.asPath}>
        My subscriptions
      </Title>
      <LoginBlock color="white" height="24px" width="24px" name={name} />
    </LoginWrapper>
  );
};

export default UserBlock;
