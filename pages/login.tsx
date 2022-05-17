import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HeaderLayout } from "../UI/header";
import { Logo } from "../UI/header/Logo/Logo";
import { Stage } from "../UI/stage";
import { FooterLayout } from "../UI/footer";
import { TopBlock } from "../UI/footer/TopBlock";
import { BottomBlock } from "../UI/footer/BottomBlock";
import { Stages } from "../UI/form/Stages";
import { Main } from "../UI/form/Main";
import { Title } from "../UI/form/Title";
import { Input } from "../UI/form/Input";
import { SubmitButton } from "../UI/form/SubmitButton";
import { Form } from "../UI/form/Form";
import { Warning } from "../UI/form/Warning";
import { LoginInputs } from "../types/type";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = (data) => console.log(data);

  console.log(process.env);
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
        <Title>Log In</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("userName")} placeholder="Username" />
          {errors.userName && <Warning>This field is required</Warning>}

          <Input
            {...register("password", { required: true })}
            placeholder="Password"
          />
          {errors.password && <Warning>This field is required</Warning>}

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
