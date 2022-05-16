import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HeaderLayout } from "../UI/header";
import { Logo } from "../UI/header/Logo/Logo";
import { Stage } from "../UI/Stage";
import { FooterLayout } from "../UI/footer";
import { TopBlock } from "../UI/footer/TopBlock";
import { BottomBlock } from "../UI/footer/BottomBlock";
import {
  Form,
  Input,
  Main,
  RegisterTitle,
  Stages,
  SubmitButton,
  Warning,
} from "./registration";

type Inputs = {
  example: string;
  exampleRequired: string;
};

const Login = () => {
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
          <Stage title="Log In" color="#FC5842" />
          <Stage title="Checkout" />
        </Stages>
        <RegisterTitle>Log In</RegisterTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("example")} placeholder="Username" />
          {errors.exampleRequired && <Warning>This field is required</Warning>}

          <Input
            {...register("exampleRequired", { required: true })}
            placeholder="Password"
          />
          {errors.exampleRequired && <Warning>This field is required</Warning>}

          <SubmitButton type="submit">Send password</SubmitButton>
        </Form>
      </Main>
      <FooterLayout>
        <TopBlock />
        <BottomBlock />
      </FooterLayout>
    </>
  );
};

export default Login;
