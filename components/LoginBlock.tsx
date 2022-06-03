import React, { useRef, useState } from "react";
import { Title, UserSettings } from "../UI/header";
import { CheckMark, GearIcon, QuitIcon } from "../UI/icons";
import styled from "styled-components";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logOut } from "../store/UserSlice";
import { useOnClickOutside } from "../hooks/useClickOutside";

const LoginBlock = ({ ...props }) => {
  const [showSettingsUser, setShowSettingsUser] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();

  const blockRef = useRef<HTMLDivElement>(null);
  const clickOutsidehandler = () => {
    setShowSettingsUser(false);
  };
  useOnClickOutside(blockRef, clickOutsidehandler);

  return (
    <>
      <WrapperLogin onClick={() => setShowSettingsUser(!showSettingsUser)}>
        <Title path={"/"}>{props.name}</Title>
        <CheckMark {...props} isShow={showSettingsUser} />
      </WrapperLogin>

      {showSettingsUser && (
        <UserSettings ref={blockRef}>
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
