import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { User } from "../types/type";
import { LoginWrapper } from "../UI/header/Login/LoginWrapper";
import { Title } from "../UI/header/Login/Title";
import CheckMark from "./CheckMark";

const UserBlock: React.FC = () => {
  const user = useSelector<RootState, User>((state) => state.users.users);
  const { name } = user;

  return (
    <LoginWrapper>
      {name && (
        <>
          <Title>My subscriptions</Title>
          <CheckMark color="white" height="24px" width="24px" name={name} />
        </>
      )}
    </LoginWrapper>
  );
};

export default UserBlock;
