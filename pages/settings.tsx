import React, { useState } from "react";
import { SettingsTitle } from "../UI/SettingsTitle";
import { Main } from "../UI/Main";
import { Line } from "../UI/checkout/Line";
import { Wrapper } from "../UI/Wrapper";
import { SettingsMenuTitle } from "../UI/stage/SettingsMenuTitle";
import { SettingsSubtitle } from "../UI/stage/SettingsSubtitle";
import { Input } from "../UI/form/Input";
import { SubmitButton } from "../UI/form/SubmitButton";

const Settings = () => {
  const [activeTitle, setActiveTitle] = useState(true);
  return (
    <Main>
      <SettingsTitle>Settings</SettingsTitle>
      <Wrapper direction="row" align="center">
        <SettingsMenuTitle
          activeTitle={activeTitle}
          onClick={() => setActiveTitle(true)}
        >
          Personal Info
        </SettingsMenuTitle>
        <SettingsMenuTitle
          activeTitle={!activeTitle}
          onClick={() => setActiveTitle(false)}
        >
          Change password
        </SettingsMenuTitle>
      </Wrapper>

      <Line />
      {activeTitle ? (
        <>
          <SettingsSubtitle>Personal Info</SettingsSubtitle>
          <Wrapper direction="column" align="flex-start" marginBottom="48px">
            <Input width="512px" placeholder="Username" />
            <Input width="512px" placeholder="Email" />
          </Wrapper>
          <SubmitButton width="160px" marginBottom="378px">
            Save
          </SubmitButton>
        </>
      ) : (
        <>
          <SettingsSubtitle>Change Password</SettingsSubtitle>
          <Wrapper direction="column" align="flex-start" marginBottom="48px">
            <Input width="512px" placeholder="Current Password" />
            <Input width="512px" placeholder="New password" />
          </Wrapper>
          <SubmitButton width="160px" marginBottom="378px">
            Save
          </SubmitButton>
        </>
      )}
    </Main>
  );
};

export default Settings;
