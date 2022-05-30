import React, { useState } from "react";
import { UserSettings } from "../UI/header/UserSettings/UserSettings";
import { GearIcon } from "../UI/header/UserSettings/GearIcon/GearIcon";
import { QuitIcon } from "../UI/header/UserSettings/QuitIcon/QuitIcon";
import { CheckMark } from "../UI/header/Login/CheckMark";
import styled from "styled-components";
import { Title } from "../UI/header/Login/Title";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logOut } from "../store/UserSlice";

const LoginBlock = ({ ...props }) => {
  const { width, height, color, name } = props;
  const [showSettingsUser, setShowSettingsUser] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();

  return (
    <>
      <WrapperLogin onClick={() => setShowSettingsUser(!showSettingsUser)}>
        <Title path={"/"}>{name}</Title>
        <CheckMark
          width={width}
          color={color}
          height={height}
          isShow={showSettingsUser}
        />
      </WrapperLogin>

      {showSettingsUser && (
        <UserSettings>
          <IconWrapper
            onClick={() => {
              setShowSettingsUser(false);
              router.push("/settings");
            }}
          >
            <GearIcon height="24px" width="24px" color="white" />
            <IconTitle>Settings</IconTitle>
          </IconWrapper>
          <IconWrapper
            onClick={() => {
              dispatch(logOut({}));
              Cookies.set("token", "");
              setShowSettingsUser(false);
              router.push("/");
            }}
          >
            <QuitIcon height="24px" width="24px" color="white" />
            <IconTitle>Logout</IconTitle>
          </IconWrapper>
        </UserSettings>
      )}
    </>
  );
};

export default LoginBlock;

const WrapperLogin = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
  z-index: 20;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;

  &:first-child {
    margin-bottom: 32px;
  }

  cursor: pointer;
`;

const IconTitle = styled.p`
  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;

  text-align: center;
  margin-left: 12px;

  color: #ffffff;
`;
