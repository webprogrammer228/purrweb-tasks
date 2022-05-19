import React, { useState } from "react";
import { UserSettings } from "../UI/header/UserSettings/UserSettings";
import { GearIcon } from "../UI/header/UserSettings/GearIcon/GearIcon";
import { QuitIcon } from "../UI/header/UserSettings/QuitIcon/QuitIcon";
import { CheckMark } from "../UI/header/Login/CheckMark";
import styled from "styled-components";
import { Title } from "../UI/header/Login/Title";

const LoginBlock = ({ ...props }) => {
  const { width, height, color, name } = props;
  const [showSettingsUser, setShowSettingsUser] = useState(false);
  return (
    <Wrapper>
      <WrapperLogin onClick={() => setShowSettingsUser(!showSettingsUser)}>
        <Title>{name}</Title>
        <CheckMark
          width={width}
          color={color}
          height={height}
          isShow={showSettingsUser}
        />
      </WrapperLogin>

      {showSettingsUser && (
        <UserSettings>
          <IconWrapper>
            <GearIcon height="24px" width="24px" color="white" />
            <IconTitle>Settings</IconTitle>
          </IconWrapper>
          <IconWrapper>
            <QuitIcon height="24px" width="24px" color="white" />
            <IconTitle>Logout</IconTitle>
          </IconWrapper>
        </UserSettings>
      )}
    </Wrapper>
  );
};

export default LoginBlock;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperLogin = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
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
