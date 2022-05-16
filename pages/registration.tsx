import React from "react";
import { HeaderLayout } from "../UI/header";
import { Logo } from "../UI/header/Logo/Logo";
import { FooterLayout } from "../UI/footer";
import { TopBlock } from "../UI/footer/TopBlock";
import { BottomBlock } from "../UI/footer/BottomBlock";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { Stage } from "../UI/Stage";
import Link from "next/link";

type Inputs = {
  example: string;
  exampleRequired: string;
};

const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it
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
        <RegisterTitle>Create account</RegisterTitle>
        <Hint>
          You need to enter your name and email. We will send you a temporary
          password by email
        </Hint>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("example")} placeholder="Username" />
          {errors.exampleRequired && <Warning>This field is required</Warning>}

          <Input
            {...register("exampleRequired", { required: true })}
            placeholder="Email"
          />
          {errors.exampleRequired && <Warning>This field is required</Warning>}

          <Input
            {...register("exampleRequired", { required: true })}
            placeholder="Password"
          />
          {errors.exampleRequired && <Warning>This field is required</Warning>}

          <SubmitButton type="submit">Send password</SubmitButton>
        </Form>
        <UnderButtonText>
          <HaveAnAccount>Have an account? </HaveAnAccount>
          <Link href="#">Go to the next step</Link>
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

export const Main = styled.main`
  margin: 0 auto;
  width: 620px;
`;

export const Stages = styled.div`
  display: flex;
`;

export const RegisterTitle = styled.h1`
  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 44px;
  line-height: 54px;

  color: #ffffff;
  margin-bottom: 16px;
`;

const Hint = styled.p`
  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;

  color: #ffffff;
  margin-bottom: 32px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 100%;
  height: 68px;

  padding: 25px 23px;
  margin-bottom: 24px;

  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;

  color: #969696;

  border: 0;
  border-radius: 10px;

  &:nth-child(3) {
    margin-bottom: 48px;
  }
`;

export const Warning = styled.span`
  color: red;
`;

export const SubmitButton = styled.button`
  width: 200px;
  height: 58px;

  background: #fc5842;
  box-shadow: 0px 10px 28px rgba(252, 88, 66, 0.2);
  border-radius: 4px;
  border: 0;

  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;

  text-align: center;

  color: #ffffff;
  margin-bottom: 48px;
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
