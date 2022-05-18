import React, { useState } from "react";
import { HeaderLayout } from "../UI/header";
import { Logo } from "../UI/header/Logo/Logo";
import { FooterLayout } from "../UI/footer";
import { TopBlock } from "../UI/footer/TopBlock";
import { BottomBlock } from "../UI/footer/BottomBlock";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { Stage } from "../UI/stage";
import Link from "next/link";
import { Stages } from "../UI/form/Stages";
import { Main } from "../UI/form/Main";
import { Title } from "../UI/form/Title";
import { Form } from "../UI/form/Form";
import { Input } from "../UI/form/Input";
import { Warning } from "../UI/form/Warning";
import { SubmitButton } from "../UI/form/SubmitButton";
import { RegisterInputs } from "../types/type";
import { useSignUpMutation } from "../store/RegisterApi";
import { useDispatch } from "react-redux";
import { signUp } from "../store/UserSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Registration = () => {
  const [signUpUser] = useSignUpMutation();
  const [errs, setErrs] = useState("");
  const dispatch = useDispatch();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();
  const onSubmit: SubmitHandler<RegisterInputs> = async (
    data: RegisterInputs
  ) => {
    if (data) {
      await signUpUser({ ...data })
        .unwrap()
        .catch((e) => {
          console.log(e);
          setErrs(e.data.message);
        })
        .then((response: RegisterInputs) => {
          setErrs("");
          dispatch(signUp({ ...response }));
          Cookies.set("token", response.token);
          router.push("/login");
        });
    }
  };

  return (
    <>
      <HeaderLayout>
        <Logo
          height="42px"
          width="42px"
          color="#FFFFFF"
          secondaryColor="#FC5842"
        />
      </HeaderLayout>
      <Main>
        <Stages>
          <Stage title="Create Account" color="#FC5842" />
          <Stage title="Log In" />
          <Stage title="Checkout" />
        </Stages>
        <Title>Create account</Title>
        <Hint>
          You need to enter your name and email. We will send you a temporary
          password by email
        </Hint>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("username", { required: true })}
            placeholder="Username"
          />
          {errors.username && <Warning>Username is not be empty</Warning>}

          <Input
            {...register("email", {
              required: "Email is requried.",
              pattern: {
                value: /^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}$/,
                message: "Please enter a valid email",
              },
            })}
            placeholder="Email"
          />
          {errors?.email && <Warning>{errors.email.message}</Warning>}

          <Input
            {...register("password", {
              required: "This is required.",
              minLength: 6,
            })}
            placeholder="Password"
            type={"password"}
          />
          {errors.password && errors.password.type === "required" && (
            <Warning>Password is not be empty</Warning>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <Warning>Minimal length your password is 6 symbols</Warning>
          )}

          <SubmitButton type="submit">Send password</SubmitButton>
        </Form>
        {errs && (
          <ErrorsBlock>
            <ErrorTitle>{errs}</ErrorTitle>
          </ErrorsBlock>
        )}

        <UnderButtonText>
          <HaveAnAccount>Have an account? </HaveAnAccount>
          <Link href="/login">Go to the next step</Link>
        </UnderButtonText>
      </Main>
      <FooterLayout>
        <TopBlock />
        <BottomBlock />
      </FooterLayout>
    </>
  );
};

export default Registration;

const Hint = styled.p`
  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;

  color: #ffffff;
  margin-bottom: 32px;
`;

const UnderButtonText = styled.div`
  display: flex;
  margin-bottom: 228px;

  & > a {
    font-family: "Thicccboi", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;

    color: #fc5842;
  }
`;

const HaveAnAccount = styled.p`
  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;

  color: #ffffff;
  margin-right: 8px;
`;

const ErrorsBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;

  background: darkred;
  position: fixed;
  top: 0;
  left: 0;
`;
const ErrorTitle = styled.h1`
  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 18px;
`;
