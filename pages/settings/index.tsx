import React, { useState } from "react";
import { SettingsTitle } from "../../UI/SettingsTitle";
import { Main } from "../../UI/Main";
import { Line } from "../../UI/checkout/Line";
import { Wrapper } from "../../UI/Wrapper";
import { SettingsMenuTitle } from "../../UI/Stage/SettingsMenuTitle";
import { SettingsSubtitle } from "../../UI/Stage/SettingsSubtitle";
import { Input } from "../../UI/form/Input";
import { SubmitButton } from "../../UI/form/SubmitButton";
import { Form } from "../../UI/form/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { SettingsPasswordType, SettingsResponseType } from "../../types/type";
import {
  useChangePasswordMutation,
  useChangePersonalInfoMutation,
} from "../../store/RegisterApi";
import Cookies from "js-cookie";
import { Warning } from "../../UI/form/Warning";
import { MessageBlock } from "../../UI/form/MessageBlock";
import { MessageTitle } from "../../UI/form/MessageTitle";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/UserSlice";

const Settings = () => {
  const [activeTitle, setActiveTitle] = useState(true);

  const [changePersonalInfo] = useChangePersonalInfoMutation();
  const [changePassword] = useChangePasswordMutation();
  const [err, setErr] = useState("");
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SettingsResponseType & SettingsPasswordType>();
  const onSubmit: SubmitHandler<
    SettingsResponseType & SettingsPasswordType
  > = async (data: SettingsResponseType) => {
    reset();
    await changePersonalInfo({ ...data })
      .unwrap()
      .then((response: SettingsResponseType) => {
        dispatch(signUp({ ...response }));
        Cookies.set("username", response.username);
        alert("Data has been changed");
      })
      .catch((e) => {
        setErr(e.message);
      });
  };

  const onSubmitPassword: SubmitHandler<SettingsPasswordType> = async (
    dataPassword: SettingsPasswordType
  ) => {
    reset();
    await changePassword({ ...dataPassword })
      .unwrap()
      .then((response: SettingsResponseType) => {
        alert("Data has been changed");
      })
      .catch((e) => {
        setErr(e.message);
      });
  };

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
          <Form onSubmit={handleSubmit(onSubmit)}>
            <SettingsSubtitle>Personal Info</SettingsSubtitle>
            <Wrapper
              direction="column"
              align="flex-start"
              marginBottom="48px"
              noMargin={true}
            >
              <Input
                {...register("username", {
                  required: "This field is required.",
                  minLength: 6,
                })}
                width="512px"
                placeholder="Username"
              />
              {errors.username && errors.username.type === "required" && (
                <Warning>Username is not be empty</Warning>
              )}

              <Input
                {...register("email", {
                  required: "Email is requried.",
                  pattern: {
                    value: /^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}$/,
                    message: "Please enter a valid email",
                  },
                })}
                width="512px"
                placeholder="Email"
              />
              {errors?.email && <Warning>{errors.email.message}</Warning>}
            </Wrapper>
            <SubmitButton width="160px" marginBottom="378px">
              Save
            </SubmitButton>
          </Form>
          {err && (
            <MessageBlock>
              <MessageTitle>{err}</MessageTitle>
            </MessageBlock>
          )}
        </>
      ) : (
        <>
          <Form onSubmit={handleSubmit(onSubmitPassword)}>
            <SettingsSubtitle>Change Password</SettingsSubtitle>
            <Wrapper
              direction="column"
              align="flex-start"
              marginBottom="48px"
              noMargin={true}
            >
              <Input
                type="password"
                {...register("currentPassword", {
                  required: "This field is required.",
                  minLength: 6,
                })}
                width="512px"
                placeholder="Current Password"
              />
              {errors.currentPassword &&
                errors.currentPassword.type === "required" && (
                  <Warning>Password is not be empty</Warning>
                )}
              {errors.currentPassword &&
                errors.currentPassword.type === "minLength" && (
                  <Warning>Minimal length your password is 6 symbols</Warning>
                )}
              <Input
                type="password"
                {...register("newPassword", {
                  required: "This field is required.",
                  minLength: 6,
                })}
                width="512px"
                placeholder="New password"
              />
              {errors.newPassword && errors.newPassword.type === "required" && (
                <Warning>Password is not be empty</Warning>
              )}
              {errors.newPassword &&
                errors.newPassword.type === "minLength" && (
                  <Warning>Minimal length your password is 6 symbols</Warning>
                )}
            </Wrapper>
            <SubmitButton width="160px" marginBottom="378px">
              Save
            </SubmitButton>
          </Form>
          {err && (
            <MessageBlock>
              <MessageTitle>{err}</MessageTitle>
            </MessageBlock>
          )}
        </>
      )}
    </Main>
  );
};

export default Settings;
